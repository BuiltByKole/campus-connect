import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import RootLayout from '../layouts/RootLayout'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import OpportunitiesPage from '../pages/OpportunitiesPage'

// Root route
const rootRoute = createRootRoute({
  component: RootLayout,
})

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: SignupPage,
})

const opportunitiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/opportunities',
  component: OpportunitiesPage,
})

// Combine routes
export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  signupRoute,
  opportunitiesRoute,
])

// Create router
export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
