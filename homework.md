# Test Plan for Borsibaar Application

**Project:** Borsibaar

**Team:** Team 12

---

## 1. Testing Objectives

The primary objectives of testing the Borsibaar application are:

- **Functionality Verification**: Ensure all features (inventory management, POS, sales tracking, user management) work as specified
- **Data Integrity**: Validate that all transactions, inventory updates, and sales records are accurate and persistent
- **Security Testing**: Verify authentication, authorization and data protection mechanisms
- **User Experience**: Ensure the UI is responsive, intuitive, and performs well across different devices
- **Integration Validation**: Confirm seamless communication between frontend, backend and database components
- **Reliability**: Ensure the system handles errors gracefully and recovers from failures
- **Performance**: Verify the application meets acceptable response time and throughput requirements

---

## 2. Testing Levels

### 2.1 Unit Testing

- **Backend (Java/Spring Boot)**
  - Service layer logic (business rules, calculations)
  - Repository layer (database queries)
  - Utility classes and helper functions
  - DTO/Entity mappings
  - Custom exceptions and error handling

- **Frontend (Next.js/TypeScript)**
  - No unit testing framework currently configured
  - Consider adding tests for: component rendering, utility functions, custom hooks, API route handlers

### 2.2 Integration Testing

- Backend API endpoints (controller layer)
- Database integration (Liquibase migrations, queries)
- Frontend-backend communication (API calls)
- Authentication flow (login, logout, session management)
- Third-party service integrations (Google OAuth2)

### 2.3 System Testing

- End-to-end user workflows (complete POS transaction, inventory management cycle)
- Multi-user scenarios
- Cross-browser compatibility
- Mobile responsiveness
- Docker containerization and deployment

### 2.4 Acceptance Testing

- User acceptance testing (UAT) with stakeholders
- Business requirement validation
- Usability testing

---

## 3. Test Scope

### 3.1 In Scope

**Backend Features:**

- User authentication and authorization
- Organization management
- Product management (CRUD operations)
- Inventory tracking and updates
- Category management
- Bar station management
- Sales transaction processing
- Account management
- Scheduled jobs (PriceCorrectionJob for inactive product price updates)

**Frontend Features:**

- Login/logout functionality
- Dashboard (sales overview, charts)
- POS (Point of Sale) interface
- Inventory management UI
- Product and category management
- Bar station configuration
- Client-facing interface
- Onboarding process
- Responsive design and mobile compatibility

**Infrastructure:**

- Docker container setup
- Database migrations (Liquibase)
- Nginx reverse proxy configuration (Nginx is used as the production reverse proxy / SSL terminator and to route OAuth callbacks to the backend (SSL termination & HTTP -> HTTPS redirection; reverse proxy / routing; OAuth correctness and header handling))
- Environment configurations (dev, prod)

### 3.2 Out of Scope

- Performance testing under extreme load (stress testing)
- Penetration testing and advanced security audits
- Internationalization/localization beyond Estonian/English
- Automated E2E testing (Playwright/Selenium not configured)
- Frontend unit testing (Jest not configured)

---

## 4. Test Approach

### 4.1 Testing Strategy

- **White-box testing**: For unit tests with knowledge of internal code structure
- **Black-box testing**: For integration and system tests focusing on functionality
- **Automated testing**: Prioritize automation for unit and integration tests
- **Manual testing**: For UI/UX validation and exploratory testing

### 4.2 Testing Methods

**Unit Testing:**

- JUnit 5 and Mockito for backend tests
- Frontend: No testing framework currently installed (consider adding Jest and React Testing Library)
- Aim for 70%+ code coverage on critical backend business logic

**Integration Testing:**

- Spring Boot Test for API testing with MockMvc
- H2 in-memory database for testing (not TestContainers) - keep H2 for unit and fast service-layer tests (already configured).
- Manual testing for Next.js API routes

**System Testing:**

- Manual testing of complete workflows
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Note: No automated E2E testing framework currently configured

**Regression Testing:**

- Automated test suite execution before each release
- Focus on core functionality and previously identified bugs

### 4.3 Defect Management

- Track bugs in GitHub Issues
- Classify by severity: Critical, High, Medium, Low
- Assign priority based on impact and frequency

---

## 5. Test Environment

### 5.1 Development Environment

- **Backend**: Java 21, Spring Boot 3.5.5, Maven
- **Frontend**: Node.js 18+, Next.js 15, TypeScript
- **Database**: PostgreSQL 17
- **IDE**: IntelliJ IDEA / VS Code
- **Version Control**: Git/GitHub

### 5.2 Testing Environment

- **Containerization**: Docker and Docker Compose
- **Local Testing**: `docker-compose.yaml` for local development
- **Production Simulation**: `docker-compose.prod.yaml` for production-like testing
- **CI/CD**: Not currently configured

### 5.3 Hardware/Software Requirements

- Modern web browsers (latest 2 versions)
- Screen resolutions: Desktop (1920x1080+), Tablet (768x1024), Mobile (375x667)
- Operating Systems: macOS, Windows, Linux

### 5.4 Test Data

- Sample organizations, users, products, and categories
- Mock sales transactions
- Test user accounts with different roles (admin, user)

---

## 6. Entry and Exit Criteria

### 6.1 Entry Criteria

- Code is committed to the repository and builds successfully
- Unit tests pass for the module/feature being tested
- Test environment is set up and accessible
- Test data is prepared
- Test cases are documented and reviewed

### 6.2 Exit Criteria

- All planned test cases executed
- 90%+ of critical and high-priority test cases pass
- All critical and high-severity defects are resolved
- Code coverage meets minimum threshold (70% for backend unit tests)
- Performance benchmarks are met
- Documentation is complete and updated
- Stakeholder approval obtained

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
| Environment setup issues                    | Medium | Medium      | Document setup clearly, use Docker for consistency       |
| Test data quality                           | Medium | Low         | Create comprehensive test data sets early                |
| Team availability                           | Medium | Medium      | Distribute responsibilities, maintain good documentation |
| Integration issues between frontend/backend | High   | Medium      | Early integration testing, clear API contracts           |
| Database migration failures                 | High   | Low         | Test migrations in isolated environment first            |

### 8.2 Assumptions

- All team members have access to the repository and development tools
- Docker and required dependencies are installed on testing machines
- Team has basic knowledge of JUnit testing framework for backend
- Test environments mirror production configuration
- Database schema is stable (or changes are well-communicated)
- API contracts between frontend and backend are documented

---

## 9. Test Deliverables

### 9.1 Before Testing

- [ ] This test plan document
- [ ] Test case specifications (can be in GitHub Issues or separate document)
- [ ] Test environment setup guide

### 9.2 During Testing

- [ ] Defect reports (GitHub Issues)
- [ ] Test execution logs
- [ ] Code coverage reports (backend only - JaCoCo not yet configured)
- [ ] Test status reports (weekly/bi-weekly)

### 9.3 After Testing

- [ ] Final test summary report
- [ ] Code coverage analysis (backend tests)
- [ ] Defect summary and resolution status
- [ ] Lessons learned document
- [ ] Updated documentation (README, API docs)
- [ ] Release notes

---

## 10. Test Schedule

| Phase               | Activities                                        | Duration | Deadline     |
| ------------------- | ------------------------------------------------- | -------- | ------------ |
| Test Planning       | Review codebase, create test plan, define cases   | 4 days   | Feb 7, 2026  |
| Test Preparation    | Set up environment, prepare test data, scripts    | 3 days   | Feb 11, 2026 |
| Unit Testing        | Write/execute backend unit tests, fix issues      | 6 days   | Feb 19, 2026 |
| Integration Testing | Execute integration tests, API testing            | 5 days   | Feb 26, 2026 |
| System Testing      | Manual E2E testing, cross-browser, mobile testing | 6 days   | Mar 6, 2026  |
| Bug Fixing          | Address critical and high-priority defects        | 5 days   | Mar 13, 2026 |
| Reporting & Review  | Final report, documentation, lessons learned      | 3 days   | Mar 18, 2026 |

**Total Estimated Duration**: ~7 weeks (32 working days)

**Assumptions for single-person testing**:

- Tester is learning the application while testing
- No parallel work possible - all phases are sequential
- Includes time for context switching and documentation
- Assumes 8-hour work days
- Buffer time included for unexpected issues and rework

---

## Appendix A: Key Test Scenarios

### Critical Test Scenarios to Cover:

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

4. **Bar Station Management**
   - Create bar station
   - Assign products to station
   - Update station configuration

5. **Dashboard and Reporting**
   - View sales charts
   - Filter by date range
   - Display accurate metrics

6. **Multi-user Access**
   - Different user roles (admin, user)
   - Concurrent operations
   - Data consistency

---

## Appendix B: Testing Tools

- **Backend Unit Tests**: JUnit 5, Mockito, Spring Boot Test
- **Frontend Unit Tests**: Not currently configured
- **API Testing**: Postman (manual), Spring MockMvc (automated)
- **E2E Testing**: Not currently configured
- **Code Coverage**: Not currently configured (consider adding JaCoCo for backend)
- **Database Testing**: H2 in-memory database
- **Bug Tracking**: GitHub Issues
- **CI/CD**: Not currently configured

---

**Notes for Team Meeting:**

- Review this test plan together and adjust based on team capacity
- Assign specific test scenarios to team members
- Set up a shared document or GitHub Project board to track test execution
- Schedule daily standups to discuss testing progress and blockers
- Ensure everyone understands their responsibilities
