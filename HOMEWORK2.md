# Test Plan for Borsibaar Application

**Project:** Borsibaar  
**Team:** Team 12

---

## 1. Testing Objectives

The primary objectives of testing the Borsibaar application are:

- **Functional Correctness:** Ensure all features (inventory management, POS, sales tracking, user management, etc.) work as specified.
- **Data Integrity:** Validate that all transactions, inventory updates, and sales records are accurate and persistent.
- **Security:** Verify authentication, authorization, and data protection mechanisms.
- **User Experience:** Ensure the UI is responsive, intuitive, accessible, and performs well across devices.
- **Integration Validation:** Confirm seamless communication between frontend, backend, and database components.
- **Reliability:** Ensure the system handles errors gracefully and recovers from failures.
- **Performance:** Verify the application meets acceptable response time and throughput requirements.
- **Multi-Tenant Isolation:** Ensure organizations can only access and modify their own data.
- **Business Logic Validation:** Confirm that business rules (e.g., insufficient stock prevention, inactive product handling) are enforced correctly.

---

## 2. Testing Levels

### 2.1 Unit Testing

- **Backend (Java/Spring Boot):**
  - Service layer logic (business rules, calculations)
  - Repository layer (database queries)
  - Utility classes and helper functions
  - DTO/Entity mappings
  - Custom exceptions and error handling
**Tools:** JUnit 5, Mockito, Spring Boot Test

- **Frontend (Next.js/TypeScript):**

- No unit testing framework currently configured
  - Component rendering and state management
  - Form validation logic
  - Utility functions and custom hooks
  - API route handlers

**Tools:** Vitest, React Testing Library

### 2.2 Integration Testing

- Backend service and repository integration (using H2 or Testcontainers)
- Controller-to-service integration with authentication context
- Database integration and transaction handling scenarios (Liquibase migrations, queries)
- Frontend-backend API communication
- Authentication flow (login, logout, session management - Google OAuth2)

**Tools:** Spring Boot Test, Testcontainers, Next.js Test Utils, MSW (Mock Service Worker)

### 2.3 System Testing

- Multi-user and multi-tenant scenarios
- Cross-browser compatibility
- Responsive design validation

### 2.4 Acceptance Testing

- User acceptance testing (UAT) with stakeholders
- Business requirement validation
- Usability and accessibility testing

---

## 3. Test Scope

### 3.1 In Scope

**Backend:**
- User authentication and authorization
- Organization, product, category, and bar station management
- Inventory tracking and updates
- Sales transaction processing
- Account management
- Multi-tenant data isolation

**Frontend:**
- Login/logout functionality
- Dashboard (sales overview, charts)
- POS interface
- Inventory management UI
- Product and category management
- Bar station configuration
- Client-facing interface
- Onboarding process
- Responsive and accessible design

**Infrastructure:**

- Database migrations (Liquibase)
- Environment configurations (dev, prod)

### 3.2 Out of Scope

- Performance testing under extreme load (separate plan)
- Penetration testing and advanced security audits (separate plan)
- Internationalization/localization beyond Estonian/English
- Payment processing and third-party integrations not in requirements
- Reporting and analytics beyond sales statistics
- E2E testing

---

## 4. Test Approach

### 4.1 Testing Strategy

- **Risk-Based Testing:** Prioritize critical business logic, data integrity, security, and user-facing features.
- **White-box testing:** For unit tests with knowledge of internal code structure.
- **Black-box testing:** For integration and system tests focusing on functionality.
- **Automated testing:** Prioritize automation for unit and integration tests.
- **Manual testing:** For UI/UX validation, exploratory, and acceptance testing.

### 4.2 Testing Methods

**Unit Testing:**

- JUnit 5 and Mockito for backend tests
- Frontend unit testing (Vitest)
- Aim for 80%+ code coverage on critical backend business logic

**Integration Testing:**

- Spring Boot Test for API testing with MockMvc
- H2 in-memory database for testing (not TestContainers) - keep H2 for unit and fast service-layer tests (already configured).
- Manual testing for Next.js API routes

**System Testing:**

- Manual testing of complete workflows
- Cross-browser testing 

**Regression Testing:**

- Automated test suite execution before each release
- Focus on core functionality and previously identified bugs

### 4.3 Defect Management

- Track bugs in Jira/Github Issues.
- Classify by severity: Critical, High, Medium, Low.
- Assign priority based on impact and frequency.
- Document steps to reproduce, expected/actual results, and screenshots if needed.

---

## 5. Test Environment

### 5.2 Testing Environment

- **Containerization**: Docker and Docker Compose
- **Local Testing**: `docker-compose.yaml` for local development
- **Production Simulation**: `docker-compose.prod.yaml` for production-like testing
- **CI/CD**: Not currently configured

### 5.3 Hardware/Software Requirements

- Test functionality on different devices and operating systems.

### 5.4 Test Data

- Sample organizations, users, products, and categories
- Mock sales transactions
- Test user accounts with different roles 


---

## 6. Entry and Exit Criteria

**Success Criteria:**
- All critical user workflows pass functional tests.
- No data integrity violations in multi-tenant scenarios.
- All API endpoints return appropriate status codes and error messages.

### 6.1 Entry Criteria

- Test plan document approved.
- Test environment setup completed.
- Test data requirements identified and loaded.
- Test tools and frameworks configured.
- Code is committed and builds successfully.
- Unit tests written and passing.
- Test cases documented and reviewed.
- Defect tracking system ready.

### 6.2 Exit Criteria

- All planned test cases executed.
- 80%+ of critical and high-priority test cases pass.
- No open critical or high-severity defects.
- Code coverage meets minimum threshold (≥80% for critical modules).
- Documentation is complete and updated.

---

## 7. Roles and Responsibilities

### 7.1 Test Manager/Lead

- Create and maintain test plan
- Coordinate testing activities
- Track defects and ensure resolution
- Report testing status to the team

### 7.2 Backend Developers

- Write and maintain backend unit tests
- Fix backend defects
- Support integration testing

### 7.3 Frontend Developers

- Fix frontend defects
- Conduct UI/UX testing
- Consider implementing frontend unit tests in future iterations

### 7.4 QA/Testers (Team Members)

- Execute manual test cases
- Perform exploratory testing
- Report defects with detailed reproduction steps
- Validate bug fixes

### 7.5 DevOps/Infrastructure

- Maintain test environments
- Ensure Docker and deployment configurations work correctly
- Consider configuring CI/CD pipelines in future iterations

---

## 8. Risks and Assumptions

### 8.1 Risks

| Risk                                        | Impact | Probability | Mitigation                                               |
| ------------------------------------------- | ------ | ----------- | -------------------------------------------------------- |
| Insufficient test coverage                  | High   | Medium      | Prioritize critical paths, automate where possible       |
| Time constraints before deadline            | High   | High        | Focus on high-priority features, parallel testing        |
| Environment setup issues                    | Medium | Medium      | Document setup, use Docker for consistency               |
| Test data quality                           | Medium | Low         | Create comprehensive test data sets early                |
| Team availability                           | Medium | Medium      | Distribute responsibilities, maintain documentation      |
| Integration issues between frontend/backend | High   | Medium      | Early integration testing, clear API contracts           |
| Database migration failures                 | High   | Low         | Test migrations in isolated environment first            |
| Concurrent modifications/network failures   | Medium | Low         | Simulate in tests, handle gracefully                     |

### 8.2 Assumptions

- All team members have access to the repository and tools.
- Docker and dependencies are installed on testing machines.
- Team has basic knowledge of JUnit, Vitest and CI tools.
- Test environments mirror production configuration.
- Database schema is stable or changes are well-communicated.
- API contracts between frontend and backend are documented.

---

## 9. Test Deliverables

### 9.1 Before Testing

- Test plan document (this file)
- Test case specifications (Jira)
- Test environment setup guide

### 9.2 During Testing

- Defect reports (GitHub Issues/Jira)
- Test execution logs
- Code coverage reports (backend and frontend)

### 9.3 After Testing

- Final test summary report
- Code coverage analysis (backend and frontend)
- Defect summary and resolution status
- Updated documentation (README, API docs)
- Release notes

---
## Critical Test Scenarios to Cover:

1. **User Authentication**
   - Login with valid credentials
   - Login with invalid credentials
   - Logout functionality
   - Session management

2. **POS Transaction**
   - Add products to cart
   - Process sale via SalesController
   - Inventory automatically updated via InventoryTransaction
   - Transaction record created (sales tracked through inventory transactions)

3. **Inventory Management**
   - Add new product
   - Update product details
   - Delete product
   - Track stock levels
   - Multi-tenant isolation

4. **Bar Station Management**
   - Create/assign/update bar station
   - Assign products to station

5. **Dashboard and Reporting**
   - View sales charts
   - Filter by date range
   - Display accurate metrics

6. **Multi-user Access**
   - Different user roles (admin, user)
   - Concurrent operations
   - Data consistency

7. **Error Handling**
   - Invalid input, insufficient stock, unauthorized access, network/database failures