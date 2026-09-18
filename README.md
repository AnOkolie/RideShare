# RideShare

RideShare is a role-based ride-hailing web application. Riders can select a destination, request a fare estimate, request a ride, and track an active trip. Drivers can complete onboarding, control availability, receive real-time trip offers, publish location updates, and progress a trip through its lifecycle.

This repository contains the React frontend. It is designed to run alongside a Spring Boot API that provides REST endpoints, authenticated STOMP/WebSocket messaging, Redis-backed live-location data, and persistence.

## Highlights

- Cognito-backed email/password authentication with token-refresh handling.
- Separate rider and driver onboarding flows.
- Google Places autocomplete, reverse geocoding, and interactive map views.
- Fare and route estimate requests before a rider confirms a trip.
- Role-aware rider and driver dashboards with active-trip tracking.
- Authenticated STOMP messaging for ride offers, locations, ETAs, and trip status.
- Zustand for shared client state and TanStack Query for server state.
- Responsive Mantine UI with reusable route and map components.

## Technology stack

| Area | Technology |
| --- | --- |
| Framework | React 19, TypeScript, Vite 8 |
| Routing | React Router 7 data routers, loaders, and actions |
| UI | Mantine 9, Tabler Icons, Phosphor Icons, CSS Modules |
| Authentication | AWS Amplify Gen 2 and Amazon Cognito |
| Maps | Google Maps Platform and `@vis.gl/react-google-maps` |
| Real time | STOMP over WebSocket via `@stomp/stompjs` and `react-stomp-hooks` |
| Server state | TanStack Query 5 |
| Client state | Zustand 5 |
| Quality | ESLint, TypeScript, Vite |

## Architecture

```text
Browser
  |
  +-- React Router routes, loaders, and actions
  |     +-- Rider dashboard / Driver dashboard / Trip tracking
  |
  +-- Authenticated REST client ------> Spring Boot REST API
  |
  +-- Authenticated STOMP session ----> Spring WebSocket broker
                                          |
                                          +-- private /user/queue/... messages
                                          +-- trip-scoped /topic/... updates

AWS Cognito <--- Amplify session and refreshed access token
Google Maps <--- maps, Places selection, address lookup
Redis <--- latest driver location and ETA freshness coordination
Database <--- profiles, vehicles, trips, and durable trip history
```

### Frontend structure

```text
src/
├── api/             # Typed REST endpoint wrappers
├── components/      # Route views and reusable UI
│   ├── Address/     # Google Maps, markers, and address input
│   ├── AuthLayout/  # route protection and STOMP session provider
│   ├── Driver/      # driver availability and trip-offer dashboard
│   ├── Rider/       # ride request and rider dashboard
│   ├── Trip/        # active-trip tracking experience
│   ├── Onboarding/  # rider and driver registration flows
│   └── Shared/      # reusable controls, including ActiveTrip
├── config/          # Amplify configuration
├── hooks/           # auth, location, STOMP, and trip hooks
├── loader/          # shared route loaders
├── types/           # API/domain TypeScript types
├── utils/           # request, auth, formatting, address utilities
└── zustand/         # user, rider, and driver local stores
```

### State ownership

| Data | Owner | Why |
| --- | --- | --- |
| Cognito session, active token, selected role | Amplify + `userStore` | Used by protected routes, REST, and STOMP connection setup |
| Driver availability and rider conveniences | Zustand | Small client-owned state shared across views |
| Trip details and REST responses | Route loaders / TanStack Query | Server-owned data that can be refetched and invalidated |
| Current form/action result | React Router fetcher/action | Local to the transition that started it |
| Live driver location and ETA | STOMP messages | Temporary high-frequency updates; not database polling |

## Prerequisites

- Node.js 20 LTS or newer
- npm 10 or newer
- AWS Cognito/Amplify resources
- A Google Maps Platform browser API key
- A reachable backend REST API and STOMP/WebSocket endpoint

The companion backend normally also requires Java 21+, Redis, and a database. Those services are not started by this frontend repository.

## Installation and local development

1. Clone the repository and enter the frontend directory.

   ```bash
   git clone <repository-url>
   cd RideShare/frontend
   ```

2. Install dependencies.

   ```bash
   npm ci
   ```

3. Create `.env` in the repository root. Only `VITE_` variables are exposed to browser code.

   ```dotenv
   VITE_BASE_URL=http://localhost:8080
   VITE_STOMP_URL=ws://localhost:8080/ws

   VITE_COGNITO_USER_POOL_ID=your_cognito_user_pool_id
   VITE_COGNITO_CLIENT_ID=your_cognito_app_client_id

   VITE_GOOGLE_API_KEY=your_google_maps_browser_key
   VITE_MAP_ID=your_google_map_id
   ```

   `VITE_API_URL` is only used by the optional `callBackendApi` helper in `src/utils/aws/token.ts`. Set it to the backend origin if you use that helper.

4. Start the client.

   ```bash
   npm run dev
   ```

5. Open the URL printed by Vite, normally `http://localhost:5173`, and make sure the backend values above are reachable.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite with hot reload. |
| `npm run build` | Type-check and create a production build in `dist/`. |
| `npm run lint` | Run ESLint across the project. |
| `npm run preview` | Serve the production build locally. Run build first. |

Before opening a pull request:

```bash
npm run lint
npm run build
```

## Routes

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Landing page |
| `/login` | Public | Sign in |
| `/signup` | Public | Create an account |
| `/verify-email` | Public | Confirm an email verification code |
| `/onboarding` | Authenticated | Select a rider or driver role |
| `/onboarding/rider` | Authenticated | Rider profile, home address, payment, and emergency contact setup |
| `/onboarding/driver` | Authenticated | Driver identity, licence, vehicle, insurance, and background-check setup |
| `/rider` | Authenticated | Request a ride, view quotes, and see an active trip |
| `/driver` | Authenticated | Control availability, publish location, receive offers, and see an active trip |
| `/trips/:tripId` | Authenticated | Shared rider/driver trip tracking |
| `/profile` | Authenticated | Account and role-specific profile details |

`ProtectRoute` guards private routes. `StompSessionLayout` supplies a shared STOMP client above protected children, and `VerifiedLayout` provides the authenticated application shell.

## Authentication and authorization

1. Amplify authenticates the user with Cognito.
2. The application reads the Cognito access token with `fetchAuthSession()`.
3. REST calls add `Authorization: Bearer <access-token>` and `X-Active-Role` headers.
4. `StompSessionLayout` opens a STOMP session only when a token is present and sends the Bearer token in STOMP `CONNECT` headers.
5. The backend must validate the JWT, attach a `Principal` to the STOMP session, and authorize all publish and subscription destinations.

Treat identifiers from a STOMP destination or message body as untrusted. The backend should derive identity from the authenticated principal and verify that the user owns the driver profile or participates in the trip.

## STOMP destination conventions

The companion backend should configure the expected prefixes:

```java
registry.enableSimpleBroker("/topic", "/queue");
registry.setApplicationDestinationPrefixes("/app");
registry.setUserDestinationPrefix("/user");
```

| Purpose | Client action | Example destination |
| --- | --- | --- |
| Driver sends location | `SEND` | `/app/drivers/{driverId}/location` |
| Driver receives an exclusive ride offer | Subscribe | `/user/queue/ride-offers` |
| Driver receives arrival eligibility | Subscribe | `/user/queue/driver/eligible` |
| Rider receives updated ETA | Subscribe | `/user/queue/driver/eta` |
| Trip members receive status updates | Subscribe | A trip topic or private user queue |

`/app` is handled by Spring message controllers; `/topic` and `/queue` are broker prefixes. A client subscribes to `/user/queue/ride-offers`, while the backend sends with:

```java
messagingTemplate.convertAndSendToUser(
    principalName,
    "/queue/ride-offers",
    payload
);
```

Always call React subscription hooks at the top level. Make the effect opt out when the client, role, or destination is unavailable—never pass an empty destination.

```tsx
const destination = role === "driver" ? "/user/queue/ride-offers" : undefined;

useEffect(() => {
  if (!client?.connected || !destination) return;

  const subscription = client.subscribe(destination, handleOffer);
  return () => subscription.unsubscribe();
}, [client, destination, handleOffer]);
```

## Trip lifecycle

```text
REQUESTED → ACCEPTED → ARRIVED → IN_PROGRESS → COMPLETED
```

- The rider creates a `REQUESTED` trip.
- An eligible driver accepts it, transitioning to `ACCEPTED`.
- The driver reports `ARRIVED` after the backend validates proximity to pickup.
- The driver starts the trip, moving it to `IN_PROGRESS`.
- The backend validates completion and sets `COMPLETED`.

The role-aware `ActiveTrip` component should take priority over the normal dashboard action: riders should not be shown another ride-request flow during an active trip, and drivers should not receive competing offers while committed to one.

## Backend REST contract

The current client calls the following endpoints. If the backend API changes, update these endpoint wrappers together in `src/api/trips.ts`.

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/api/trips/options` | Obtain trip options from pickup/destination coordinates |
| `POST` | `/api/routes/calculate` | Calculate route duration/distance |
| `POST` | `/api/trips/quote` | Calculate an estimated fare |
| `POST` | `/api/trips/` | Create a trip request |
| `PATCH` | `/api/trips/accept/{tripId}` | Accept a trip as a driver |
| `GET` | `/api/trips/{tripId}` | Read a trip by ID |
| `PATCH` | `/api/trips/{tripId}/start` | Start an accepted trip |
| `GET` | `/api/trips/rider` | Read the rider's active trip |
| `GET` | `/api/trips/driver` | Read the driver's active trip |

REST wrappers return a success/error envelope:

```ts
type RequestResolve<T> =
  | { data: T }
  | { error: { status: number; message: string } };
```

The principal trip shape is `RequestRideResponse` in `src/types/trips.ts`: it includes the trip ID, status, pickup/destination coordinates and addresses, estimates, fare, timestamp, and participant IDs.

## Location and ETA architecture

Location is operational data; do not write to a relational database on every GPS callback.

Recommended flow:

1. The driver obtains browser geolocation updates.
2. The client throttles STOMP location publishes.
3. The backend verifies the STOMP principal owns the driver profile and may publish for that active trip.
4. Redis stores the latest coordinate with a short TTL, such as `driver:location:{driverId}`.
5. The backend broadcasts validated locations only to parties authorized to see them.
6. A routing API refreshes ETA only when the existing ETA is stale or the route changed materially, then streams the new ETA over STOMP.
7. Persist durable milestones and final trip metrics in the database, not every coordinate.

For arrival detection, use a local distance calculation (for example Haversine) and an acceptable radius such as 50–100 metres. Use a route provider for ETA and driving distance, not for every location update or address comparison.

## AWS Amplify

Amplify Gen 2 definitions live under `amplify/`:

- `amplify/auth/resource.ts` configures email login.
- `amplify/data/resource.ts` contains the data resource configuration.
- `amplify/backend.ts` composes those resources.

The browser config in `src/config/awsConfig.ts` deliberately reads Cognito values from the environment. Do not commit `.env`, access tokens, private credentials, or environment-specific generated Amplify outputs.

Provisioning an Amplify sandbox/deployment requires configured AWS credentials and can incur cloud costs. Review the infrastructure before running deployment commands.

## Google Maps setup

The application passes `VITE_GOOGLE_API_KEY` to the Maps provider and uses `VITE_MAP_ID` for map styling/advanced marker support.

For a browser-restricted key, enable only the APIs needed by your usage, typically:

- Maps JavaScript API
- Places API
- Geocoding API, when reverse-geocoding is performed by the browser

Restrict the key to the local and production HTTP referrers you control. Browser keys are public by design, so do not use one for privileged server-side Google services.

## Development guidelines

- Keep REST API calls in `src/api/` and reuse `request()` so headers and response handling stay consistent.
- Keep live/high-frequency data in STOMP and Redis, not relational database polling.
- Use an effect or custom hook for `client.subscribe()`; never subscribe during component render.
- Use `useCallback` for STOMP message handlers to avoid needless unsubscribe/resubscribe cycles.
- Use the backend's authenticated STOMP principal for identity checks, not client-supplied driver IDs.
- Use loaders for initial page data and TanStack Query for server-cache/refetch behavior. Avoid storing server responses in Zustand unless they are truly client-owned.
- Do not instantiate a new `QueryClient` inside a component. Reuse the client provided by `QueryClientProvider`.
- Keep one source of truth for active trip state; invalidate/refetch after durable transitions and process live updates from STOMP.

## Troubleshooting

### REST requests fail

- Confirm the backend is running and `VITE_BASE_URL` has the right protocol, host, and port.
- Inspect the browser Network panel for request URL, CORS response, and HTTP status.
- Allow the frontend origin plus `Authorization` and `X-Active-Role` headers in backend CORS configuration.
- Sign in again when Cognito tokens are missing or expired.

### STOMP subscriptions fail

- Verify `VITE_STOMP_URL` is a WebSocket endpoint, not a REST URL.
- Confirm the client sends the Bearer token in STOMP `CONNECT` headers.
- Register JWT validation on Spring's inbound STOMP channel.
- Never subscribe with `""`; Spring rejects it with `Destination must not be empty`.
- Check that the subscriber's principal name exactly matches the value supplied to `convertAndSendToUser`.

### Map is blank

- Restart Vite after changing `.env`.
- Enable Maps JavaScript API for the Google project.
- Verify allowed referrers include the Vite origin.
- Make sure the map container has a non-zero height.
- Confirm the map ID belongs to the API key's Google Cloud project.

### Route URL changes but the page does not

- Navigate with React Router's `navigate()` or `Link`, not `window.location`.
- Ensure the target route is nested under a layout that renders `<Outlet />`.
- Keep one mounted `RouterProvider` at the application root.

## Security notes

- Every `VITE_` value is public browser configuration after the app is built.
- Never put database passwords, Cognito client secrets, service credentials, or private API tokens in Vite variables.
- Validate JWT issuer, signature, audience/client ID, expiry, and intended token type on the backend.
- Enforce role and trip-participant authorization for every REST endpoint and STOMP action.
- Use HTTPS/WSS and restrictive CORS policies outside local development.

## Future work

Common next steps include payments, push notifications, cancellations/no-show policies, dispatch ranking, native background location support, support/admin tooling, durable trip audit events, automated tests, monitoring, and CI/CD.

## License

No license has been declared. Add a `LICENSE` file before distributing the project or accepting external contributions.
