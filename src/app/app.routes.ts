import { Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';


export const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{
		path: 'login',
		loadComponent: () => import('./components/auth/login/login.component').then((m) => m.LoginComponent),
	},
	{
		path: 'forgot-password',
		loadComponent: () => import('./components/auth/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent),
	},
	{
		path: 'register',
		loadComponent: () => import('./components/auth/register/register.component').then((m) => m.RegisterComponent),
	},
	{
		path: 'inventory',
		loadComponent: () => import('./components/inventory/inventory-list/inventory-list.component').then((m) => m.InventoryListComponent),
	},
	{
		path: 'charts',
		loadComponent: () => import('./components/admin/smc-dashboard/weighbridge-charts.component').then((m) => m.WeighbridgeChartsComponent),
	},
  {
    path: 'smc',
    loadComponent: () => import('./components/admin/smc-dashboard/smc-dashboard.component').then((m) => m.SmcDashboardComponent),
  },
  {
  path: 'admin/excel-upload',
  loadComponent: () =>
    import('./components/admin/excel-upload/excel-upload.component').then(
      (m) => m.ExcelUploadComponent
    ),
},

	{
		path: 'devices/search',
		loadComponent: () => import('./components/devices/device-search/device-search.component').then((m) => m.DeviceSearchComponent),
	},
  {
  path: 'devices/:deviceId/history',
  loadComponent: () => import('./components/devices/device-history/device-history.component')
    .then(m => m.DeviceHistoryComponent),
},

	{
		path: 'maintenance/request',
		loadComponent: () => import('./components/maintenance/maintenance-request/maintenance-request.component').then((m) => m.MaintenanceRequestComponent),
	},
	{
		path: 'admin/excel-upload',
		loadComponent: () => import('./components/admin/excel-upload/excel-upload.component').then((m) => m.ExcelUploadComponent),
		canActivate: [AdminGuard],
	},
	{
		path: 'admin/dashboard',
		loadComponent: () => import('./components/admin/dashboard/dashboard.component').then((m) => m.DashboardComponent),
		canActivate: [AdminGuard],
	},
  {
  path: 'devices/:deviceId/history',
  loadComponent: () => import('./components/devices/device-history/device-history.component')
    .then(m => m.DeviceHistoryComponent),
},

   {
    path: 'admin/all-requests',
		loadComponent: () => import('./components/admin/all-requests/all-requests').then((m) => m.AllRequestsComponent),
	},
	{
		path: 'admin/items/new',
		loadComponent: () => import('./components/admin/item-form/item-form.component').then((m) => m.ItemFormComponent),
		canActivate: [AdminGuard],
	},
	{
		path: 'admin/items/:id/edit',
		loadComponent: () => import('./components/admin/item-form/item-form.component').then((m) => m.ItemFormComponent),
		canActivate: [AdminGuard],
	},
	{
		path: 'pages-not-found', 
		loadComponent: () => import('./components/shared/header/page-not-found.component').then((m) => m.PageNotFoundComponent),
	},
	{
		path: 'coming-soon', 
		loadComponent: () => import('./components/shared/header/coming-soon.component').then((m) => m.ComingSoonComponent),
	},
	// fallback
	{ path: '**', redirectTo: 'inventory' },
];
