export class DateFormatterUtil {
  /**
   * Parse various backend date shapes into a Date or null.
   */
  static parseDate(input: any): Date | null {
    if (input === null || input === undefined || input === '') return null;

    if (input instanceof Date) return isNaN(input.getTime()) ? null : input;

    // JSON array [yr, mo, day, hr, min, sec, nano]
    if (Array.isArray(input) && input.length >= 6) {
      const [yr, mo, day, hr = 0, min = 0, sec = 0, nano = 0] = input.map(Number);
      const ms = Math.floor((Number(nano) || 0) / 1_000_000);
      const d = new Date(Number(yr), Number(mo) - 1, Number(day), Number(hr), Number(min), Number(sec), ms);
      return isNaN(d.getTime()) ? null : d;
    }

    // Firestore-like { seconds, nanos }
    if (typeof input === 'object') {
      const secs = Number((input as any).seconds ?? (input as any)._seconds ?? NaN);
      if (!isNaN(secs)) {
        const nanos = Number((input as any).nanos ?? (input as any)._nanoseconds ?? 0);
        return new Date(secs * 1000 + Math.floor((nanos || 0) / 1_000_000));
      }
      return null;
    }

    let s = String(input).trim();
    if (!s) return null;

    // Pure numeric string — epoch seconds, ms, or ns
    if (/^\d+$/.test(s)) {
      // use BigInt for long values
      try {
        const n = BigInt(s);
        let ms: number;
        if (n > 1_000_000_000_000_000_000n) ms = Number(n / 1_000_000n); // nanoseconds -> ms
        else if (n > 1_000_000_000_000n) ms = Number(n); // ms
        else ms = Number(n) * 1000; // seconds
        const d = new Date(ms);
        return isNaN(d.getTime()) ? null : d;
      } catch {
        // fallback to Number
        const num = Number(s);
        if (!isNaN(num)) return new Date(num);
      }
    }

    // Comma-separated string
    if (s.includes(',') && /^\d/.test(s)) {
      const parts = s.split(',').map(p => Number(p.trim()));
      if (parts.length >= 6) {
        const [yr, mo, day, hr = 0, min = 0, sec = 0, nano = 0] = parts;
        const ms = Math.floor((Number(nano) || 0) / 1_000_000);
        const d = new Date(Number(yr), Number(mo) - 1, Number(day), Number(hr), Number(min), Number(sec), ms);
        return isNaN(d.getTime()) ? null : d;
      }
    }

    // ISO / date string — truncate fractional seconds to 3 digits
    s = s.replace(/(\d{2}:\d{2}:\d{2})\.(\d{3})\d+/, '$1.$2');
    const d = new Date(s);
    return isNaN(d.getTime()) ? null : d;
  }

  /**
   * Format a raw date value into a human-readable `MM DD, YYYY hh:mm AM/PM` string or 'N/A'.
   */
  static formatDate(input: any): string {
    const d = this.parseDate(input);
    if (!d) return 'N/A';
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  /** Format date + time together */
  static formatDateTime(input: any): string {
    const d = this.parseDate(input);
    if (!d) return 'N/A';
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) + ' ' +
      d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  /** Format only the time portion */
  static formatTime(input: any): string {
    const d = this.parseDate(input);
    if (!d) return 'N/A';
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  /**
   * Helper to enrich an array of objects with formatted date fields (optional convenience).
   */
  static enrichWithFormattedDates<T extends Record<string, any>>(items: T[], createdKeys = ['createdAt','created_at','created']) {
    if (!Array.isArray(items)) return items;
    return items.map(it => {
      const get = (keys: string[]) => {
        for (const k of keys) if (it[k] !== undefined && it[k] !== null) return it[k];
        for (const p of Object.keys(it)) {
          const v = it[p];
          if (v && typeof v === 'object' && !Array.isArray(v)) {
            for (const k of keys) if (v[k] !== undefined && v[k] !== null) return v[k];
          }
        }
        return null;
      };
      const created = get(createdKeys);
      const updated = get(['updatedAt','updated_at','updated']);
      return { ...it, formattedCreatedAt: this.formatDate(created), formattedUpdatedAt: this.formatDate(updated) } as T;
    });
  }
}
