# RideShare Database Design

## Overview

This document describes the database architecture for the RideShare platform.

Authentication is delegated entirely to **AWS Cognito**. The database stores only application-specific data and never stores user passwords or authentication secrets.

The design follows the following principles:

- Authentication handled by AWS Cognito
- One account can be both a rider and driver
- Driver information is separated from general user information
- Spatial queries use MySQL POINT columns
- Every table supports auditing through timestamps
- All relationships use foreign key constraints
- Tables are normalized to minimize duplicated information

---

# High Level Entity Diagram

```

AWS Cognito
│
└── User (users)
│
├── RiderProfile
│
├── DriverProfile
│ ├── Vehicle
│ ├── DriverDocuments
│ └── DriverLocationHistory
│
├── EmergencyContacts
│
├── SavedPlaces
│
└── Notifications

Trips
│
├── TripEvents
├── Payments
└── Reviews

```

---

# Authentication

Authentication is **not** handled by the application.

AWS Cognito is responsible for:

- User registration
- Login
- Password reset
- Email verification
- MFA
- JWT generation

The application receives a JWT from Cognito and extracts the user's
`sub` claim.

The `sub` uniquely identifies a user and is stored inside the `users`
table.

---

# Users

Represents every authenticated user of the application.

A user may be

- Rider
- Driver
- Both Rider and Driver

This table stores only identity information that belongs to the
application.

## Columns

| Column | Description |
|---------|-------------|
| id | Internal database identifier |
| cognito_sub | AWS Cognito user identifier |
| email | User email |
| first_name | First name |
| last_name | Last name |
| display_name | Public profile name |
| phone_number | Verified phone number |
| profile_picture | Profile image URL |
| role | RIDER, DRIVER or BOTH |
| email_verified | Cached Cognito verification state |
| created_at | Creation timestamp |
| updated_at | Last modification timestamp |

---

# Rider Profile

Stores rider-specific information.

Not every user is required to have a rider profile, although every
account is capable of requesting rides.

## Responsibilities

- Rider rating
- Trip statistics
- Future rider preferences

---

# Driver Profile

Stores all driver-specific information.

A user only receives a DriverProfile after completing onboarding and
being approved.

## Responsibilities

- Driver status
- Driver approval
- Current location
- Driver rating
- Heartbeat tracking
- Geospatial indexing

Driver availability is determined by the combination of

- approval_status
- status
- last_heartbeat

---

# Driver Documents

Stores uploaded verification documents.

Document storage itself is performed by S3.

The database stores only references.

Supported document types

- Driver License (Front)
- Driver License (Back)
- Vehicle Registration
- Insurance

---

# Vehicles

A driver may own multiple vehicles.

Only one vehicle may be active at any given time.

Vehicle approval is independent of driver approval.

Vehicle information includes

- Make
- Model
- Year
- Colour
- Plate Number
- Seating Capacity

---

# Emergency Contacts

Stores emergency contacts provided during onboarding.

Multiple contacts may exist for one user.

---

# Saved Places

Allows users to quickly select common destinations.

Examples

- Home
- Work
- Airport

Spatial indexing is enabled for future map queries.

---

# Trips

The Trips table represents the central entity of the application.

Every ride request eventually becomes one Trip.

Trip lifecycle

REQUESTED

↓

ACCEPTED

↓

ARRIVING

↓

IN_PROGRESS

↓

COMPLETED

or

↓

CANCELLED

Trips store

- pickup location
- destination
- estimated distance
- actual distance
- estimated duration
- actual duration
- fare
- timestamps

---

# Trip Events

Provides an immutable audit log of trip state transitions.

Examples

REQUESTED

DRIVER_ASSIGNED

ARRIVED

STARTED

COMPLETED

CANCELLED

Metadata is stored as JSON for extensibility.

---

# Payments

Payments are handled by Stripe.

The application never stores card information.

Only Stripe identifiers are persisted.

---

# Reviews

Users can rate one another after trip completion.

A review belongs to

- one trip
- one reviewer
- one reviewee

---

# Notifications

Stores in-app notifications.

Examples

- Driver accepted your trip
- Payment failed
- Profile approved
- Driver arrived

---

# Driver Location History

Stores historical driver positions.

This table is optional but enables

- Analytics
- Heatmaps
- Driver replay
- Demand prediction

The current location is always stored on DriverProfile.

Historical positions are periodically archived into this table.

---

# Spatial Queries

RideShare uses MySQL Spatial Extensions.

POINT columns are used instead of separate latitude and longitude
columns.

Advantages

- Faster nearest-neighbour searches
- Cleaner schema
- Native GIS functions
- Spatial indexing

Driver matching uses

POINT

+

Geohash

to efficiently locate nearby drivers.

---

# Future Tables

The schema is intentionally extensible.

Potential future additions include

- Promotions
- Referrals
- Support Tickets
- Driver Earnings
- Scheduled Trips
- Surge Pricing
- Chat Messages
- Push Notification Tokens
- Admin Users
- Audit Logs