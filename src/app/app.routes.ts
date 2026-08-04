import { Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { CimsSupportEngineerGuard, CimsFieldPersonGuard, CimsReviewerGuard, CimsAdminGuard, CimsNotificationGuard, CimsTaskGuard, CimsTaskCreateGuard } from './guards/cims.guards';
import { AnprAnalyticsTableComponent } from './components/admin/anpr-analytics-table.component';
import { AnprAnalyticsChartsComponent } from './components/admin/anpr-analytics-charts.component';
import { BusAnalyticsComponent } from './components/admin/bus-analytics.component';


export const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{
		path: 'login',
		loadComponent: () => import('./components/auth/login/login.component').then((m) => m.LoginComponent),
	},
	{
		path: 'home',
		loadComponent: () => import('./components/shared/home-dashboard.component').then((m) => m.HomeDashboardComponent),
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
		path: 'anpr',
		children: [
			{
				path: 'analytics-table',
				component: AnprAnalyticsTableComponent
			},
			{
				path: 'analytics-charts',
				component: AnprAnalyticsChartsComponent
			},
			{
				path: 'bus-analytics',
				component: BusAnalyticsComponent
			}
		]
	},
	{
		path: 'maintenance/request',
		loadComponent: () => import('./components/maintenance/maintenance-request/maintenance-request.component').then((m) => m.MaintenanceRequestComponent),
	},
	{
		path: 'admin/dashboard',
		loadComponent: () => import('./components/admin/dashboard/dashboard.component').then((m) => m.DashboardComponent),
		canActivate: [AdminGuard],
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
	{
		path: 'pbs/stations',
		loadComponent: () => import('./components/admin/pbs-stations/pbs-stations.component').then((m) => m.PbsStationsComponent),
	},
	{
		path: 'pbs/analytics',
		loadComponent: () => import('./components/admin/pbs-analytics/pbs-analytics.component').then((m) => m.PbsAnalyticsComponent),
	},
	{
		path: 'chartered-bike',
		loadComponent: () => import('./components/admin/chartered-bike-dashboard/chartered-bike-dashboard.component').then((m) => m.CharteredBikeDashboardComponent),
	},
	{
		path: 'chartered-bike/stations',
		loadComponent: () => import('./components/admin/chartered-bike-stations/chartered-bike-stations.component').then((m) => m.CharteredBikeStationsComponent),
	},
	{
		path: 'chartered-bike/history',
		loadComponent: () => import('./components/admin/chartered-bike-history/chartered-bike-history.component').then((m) => m.CharteredBikeHistoryComponent),
	},
	{
		path: 'chartered-bike/statistics',
		loadComponent: () => import('./components/admin/chartered-bike-stats/chartered-bike-stats.component').then((m) => m.CharteredBikeStatsComponent),
	},
	{
		path: 'chartered-bike/reports',
		loadComponent: () => import('./components/admin/chartered-bike-reports/chartered-bike-reports.component').then((m) => m.CharteredBikeReportsComponent),
	},

	// ============ CAMERA INCIDENT MANAGEMENT SYSTEM (CIMS) ============
	{
		path: 'cims/notifications/settings',
		canActivate: [CimsNotificationGuard],
		loadComponent: () =>
			import('./components/admin/cims-notification-settings.component').then(
				(m) => m.CimsNotificationSettingsComponent
			),
	},
	{
		path: 'cims/support-engineer',
		canActivate: [CimsSupportEngineerGuard],
		children: [
			{
				path: 'dashboard',
				loadComponent: () => import('./components/admin/cims-support-engineer-dashboard.component').then((m) => m.CimsSupportEngineerDashboardComponent),
			},
			{
				path: 'my-tickets',
				loadComponent: () => import('./components/admin/cims-my-tickets.component').then((m) => m.CimsMyTicketsComponent),
			},
			{
				path: 'create-ticket',
				loadComponent: () => import('./components/admin/cims-support-engineer-create-ticket.component').then((m) => m.CimsCreateTicketComponent),
			},
			{
				path: 'tickets/:id',
				loadComponent: () => import('./components/admin/cims-ticket-detail.component').then((m) => m.CimsTicketDetailComponent),
			},
		]
	},
	{
		path: 'cims/field-person',
		canActivate: [CimsFieldPersonGuard],
		children: [
			{
				path: 'dashboard',
				loadComponent: () => import('./components/admin/cims-field-person-dashboard.component').then((m) => m.CimsFieldPersonDashboardComponent),
			},
			{
				path: 'tickets/:id',
				loadComponent: () => import('./components/admin/cims-ticket-detail.component').then((m) => m.CimsTicketDetailComponent),
			},
		]
	},
	{
		path: 'cims/reviewer',
		canActivate: [CimsReviewerGuard],
		children: [
			{
				path: 'dashboard',
				loadComponent: () => import('./components/admin/cims-reviewer-dashboard.component').then((m) => m.CimsReviewerDashboardComponent),
			},
			{
				path: 'queue',
				loadComponent: () => import('./components/admin/cims-reviewer-queue.component').then((m) => m.CimsReviewerQueueComponent),
			},
			{
				path: 'tickets/:id',
				loadComponent: () => import('./components/admin/cims-ticket-detail.component').then((m) => m.CimsTicketDetailComponent),
			},
		]
	},
	{
		path: 'cims/admin',
		canActivate: [CimsAdminGuard],
		children: [
			{
				path: 'dashboard',
				loadComponent: () => import('./components/admin/cims-admin-dashboard.component').then((m) => m.CimsAdminDashboardComponent),
			},
			{
				path: 'all-tickets',
				loadComponent: () => import('./components/admin/cims-all-tickets.component').then((m) => m.CimsAllTicketsComponent),
			},
			{
				path: 'incident-types',
				loadComponent: () => import('./components/admin/cims-incident-types.component').then((m) => m.CimsIncidentTypesComponent),
			},
			{
				path: 'users',
				loadComponent: () => import('./components/admin/cims-user-management.component').then((m) => m.CimsUserManagementComponent),
			},
			{
				path: 'tickets/:id',
				loadComponent: () => import('./components/admin/cims-ticket-detail.component').then((m) => m.CimsTicketDetailComponent),
			},
		]
	},
	{
		path: 'tasks',
		children: [
			{
				path: 'all',
				loadComponent: () => import('./components/tasks/tasks-all.component').then(m => m.TasksAllComponent),
				canActivate: [CimsTaskGuard]
			},
			{
				path: 'create',
				loadComponent: () => import('./components/tasks/tasks-create.component').then(m => m.TasksCreateComponent),
				canActivate: [CimsTaskCreateGuard]
			},
			{
				path: 'my',
				loadComponent: () => import('./components/tasks/tasks-my.component').then(m => m.TasksMyComponent),
				canActivate: [CimsNotificationGuard]
			},
			{
				path: ':id',
				loadComponent: () => import('./components/tasks/tasks-detail.component').then(m => m.TasksDetailComponent),
				canActivate: [CimsNotificationGuard]
			}
		]
	},

	// fallback
	{ path: '**', redirectTo: 'inventory' },
];
