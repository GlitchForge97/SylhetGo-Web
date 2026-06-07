# SylhetGo - Smart Tourism Portal
## High-Fidelity Interactive Prototype

### System Architecture Overview

This is a complete multi-tier web application for Sylhet tourism with three distinct user panels and a master administrative control system.

---

## 🌐 Access Points & Demo Credentials

### 1️⃣ TOURIST PANEL (Public Default)
**URL:** `/` (Homepage)
- **Access:** No login required - instant public access
- **Features:**
  - Hero search with destination filtering
  - Featured highlights: Sreemangal Tea Capital & Shamshernagar Heritage
  - Zone-based transport pricing calculator
  - Haor season accessibility tracker
  - Verified guide directory
  - Live community updates feed

---

### 2️⃣ GUIDE PANEL (Service Providers)
**Login URL:** `/guide`
**Dashboard URL:** `/guide/dashboard`

**Demo Credentials:**
- Email: `guide@demo.com`
- Password: `demo123`

**Features:**
- Profile settings management
- Operating area selection
- Availability toggle (online/offline)
- Booking request approval queue
- Revenue tracking & statistics
- Direct customer messaging
- SylhetGo verified badge display

---

### 3️⃣ CONTRIBUTOR PANEL (Community Members)
**Login URL:** `/contributor`
**Dashboard URL:** `/contributor/dashboard`

**Demo Credentials:**
- Username: `contributor@demo`
- Password: `demo123`

**Features:**
- Travel photo upload system
- Community update posting
- Real-time hazard reporting (flash floods, road closures)
- Contribution statistics & impact tracking
- Level progression system
- Badge rewards display
- Submission approval status

---

### 4️⃣ MASTER ADMIN DASHBOARD (System Control)
**Login URL:** `/admin/login`
**Dashboard URL:** `/admin`

**Demo Credentials:**
- Email: `admin@demo.com`
- Password: `admin123`
- 2FA Code: `123456`

**Admin Modules:**

#### Dashboard Overview (`/admin`)
- Real-time active user session monitoring
- Panel-specific activity analytics
- User growth statistics (30-day trends)
- System engagement metrics

#### Fare & Route Manager (`/admin/fares`)
- Inline-editable transport pricing table
- CNG fare management
- Boat hire rate updates
- Route distance & duration tracking

#### Spot & Content Publisher (`/admin/spots`)
- Destination creation forms
- High-resolution photo upload
- GPS coordinate mapping
- Category & seasonal information
- Draft/publish workflow

#### Guide Verification Portal (`/admin/guides`)
- Pending guide application queue
- Approve/reject verification requests
- Grant "SylhetGo Verified Badge"
- Active guide management
- Badge revocation controls

#### Community Moderation Queue (`/admin/moderation`)
- User-generated content approval
- Photo upload review
- Community update moderation
- Flagged content management (high priority)
- Hazard report validation
- Bulk approve/reject actions

---

## 🎨 Design System

**Brand Colors:**
- Primary: Deep Tea Garden Green `#0B5345`
- Accent: Fresh Leaf Lime `#2ECC71`
- Background: Clean White/Light Gray `#F8F9F9`

**Typography:** Default system font with semantic heading hierarchy

**Imagery:** Authentic local photography via Unsplash integration
- Tea plantation landscapes (Sreemangal)
- Swamp forest waterways (Ratargul)
- Mountain river stones (Jaflong, Bholaganj)

---

## 🚀 Quick Start Navigation

1. **Start at Tourist Panel:** Visit `/` for the default public experience
2. **Test Guide Login:** Navigate to `/guide` and use demo credentials
3. **Test Contributor Login:** Navigate to `/contributor` and use demo credentials
4. **Access Admin Dashboard:** Navigate to `/admin/login` and use admin credentials

---

## 📊 Key Features Demonstrated

✅ Multi-tier authentication system with distinct user roles
✅ Realistic data-dense admin interfaces
✅ Inline-editable tables (Fare Manager)
✅ File upload interfaces with drag-and-drop zones
✅ Real-time session monitoring matrix
✅ Approval queue workflows
✅ Seasonal accessibility tracking (Haor Timeline)
✅ Transparent pricing to eliminate tourist overcharging
✅ Verified badge system for service providers
✅ Community-driven content moderation

---

## 🎯 Use Cases

**For Tourists:**
- Plan itineraries with accurate fare information
- Find verified local guides
- Check seasonal accessibility for Haor regions
- View real-time community updates and hazard warnings

**For Guides:**
- Manage bookings and availability
- Build credible profile with verification badge
- Track revenue and performance metrics
- Communicate directly with tourists

**For Contributors:**
- Share authentic travel experiences
- Upload local photography
- Report safety hazards in real-time
- Earn recognition through level progression

**For Administrators:**
- Monitor all user panel activity
- Update transport fares system-wide
- Verify guide credentials
- Moderate community content
- Publish new destination listings

---

## 🔧 Technical Implementation

- **Framework:** React 18.3 with TypeScript
- **Routing:** React Router 7.13
- **Styling:** Tailwind CSS v4.0
- **Icons:** Lucide React
- **State Management:** React hooks (useState, useNavigate)
- **Layout:** Desktop-optimized 1440px responsive grid

---

**Built for:** Interactive high-fidelity prototyping and live on-site demonstrations at tourist locations.
