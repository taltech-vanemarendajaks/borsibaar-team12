# Test Plan: Borsibaar Inventory Management Module

## Document Information

- **Project**: Borsibaar Inventory Management System
- **Module**: Inventory Management
- **Version**: 1.0
- **Date**: 2024
- **Prepared By**: Test Team
- **Status**: Draft

---

## 1. Testing Objectives

### 1.1 Primary Objectives

1. **Functional Correctness**: Verify that all inventory operations (add, remove, adjust, query) function correctly according to business requirements
2. **Data Integrity**: Ensure inventory quantities, transactions, and audit trails are maintained accurately across all operations
3. **Multi-Tenant Isolation**: Validate that organizations can only access and modify their own inventory data
4. **Business Logic Validation**: Confirm that business rules (e.g., insufficient stock prevention, inactive product handling) are enforced correctly
5. **API Contract Compliance**: Verify that all REST endpoints return correct HTTP status codes and response formats
6. **User Experience**: Ensure the frontend provides intuitive and responsive inventory management capabilities
7. **Performance**: Validate that inventory operations perform acceptably under expected load
8. **Security**: Ensure proper authentication and authorization for all inventory operations

### 1.2 Success Criteria

- All critical inventory operations pass functional tests
- Zero data integrity violations in multi-tenant scenarios
- All API endpoints return appropriate status codes and error messages
- Frontend correctly displays and updates inventory data
- Transaction history accurately reflects all inventory changes
- Sales statistics calculations are correct

---

## 2. Testing Levels

### 2.1 Unit Testing

**Scope**: Individual components and methods in isolation

**Backend Unit Tests**:
- `InventoryService` methods (addStock, removeStock, adjustStock, getByOrganization, etc.)
- `InventoryController` endpoint handlers
- `InventoryRepository` query methods
- `InventoryTransactionRepository` query methods
- Business logic validation (insufficient stock, organization ownership, inactive products)
- DTO mapping and transformation logic

**Frontend Unit Tests**:
- React component rendering and state management
- Form validation logic
- Data transformation utilities
- API route handlers (Next.js API routes)

**Tools**:
- Backend: JUnit 5, Mockito
- Frontend: Jest, React Testing Library

### 2.2 Integration Testing

**Scope**: Interaction between components and external systems

**Backend Integration Tests**:
- Service layer with real repositories (using `@DataJpaTest` or test database)
- Controller-to-Service integration with authentication context
- Database transaction handling and rollback scenarios
- Multi-tenant data isolation across repositories
- Transaction history creation and retrieval
- Sales statistics aggregation across multiple transactions

**Frontend Integration Tests**:
- API route to backend communication
- Component integration with API routes
- Authentication flow with inventory endpoints
- Error handling and retry mechanisms

**Tools**:
- Backend: Spring Boot Test, Testcontainers (PostgreSQL)
- Frontend: Next.js Test Utils, MSW (Mock Service Worker)

### 2.3 System Testing

**Scope**: End-to-end functionality from user perspective

**Test Scenarios**:
- Complete inventory management workflows:
    - User logs in → views inventory → adds stock → verifies transaction history
    - User removes stock → verifies quantity update → checks insufficient stock error
    - User adjusts stock → verifies audit trail
    - User filters by category → verifies filtered results
- Multi-user concurrent operations
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Responsive design validation (mobile, tablet, desktop)

**Tools**:
- Playwright or Cypress for E2E testing
- Docker Compose for full stack testing

### 2.4 Acceptance Testing

**Scope**: Business requirements validation

**User Stories to Validate**:
- As a bar manager, I can view all inventory items for my organization
- As a bar manager, I can add stock to products and see the quantity increase
- As a bar manager, I can remove stock and receive an error if insufficient stock exists
- As a bar manager, I can adjust stock quantities for audit purposes
- As a bar manager, I can view transaction history for any product
- As a bar manager, I can view sales statistics by user and by station
- As a bar manager, I can filter inventory by category
- As a bar manager, I cannot access inventory from other organizations

---

## 3. Test Scope

### 3.1 In Scope

**Backend Components**:
- `InventoryController` - All REST endpoints
- `InventoryService` - All business logic methods
- `InventoryRepository` - All query methods
- `InventoryTransactionRepository` - Transaction queries
- `Inventory` entity - Data model validation
- `InventoryTransaction` entity - Audit trail model
- DTOs (Request/Response) - Data transfer validation
- Multi-tenant organization isolation
- Transaction management and rollback

**Frontend Components**:
- Inventory management page (`/inventory`)
- Add Stock modal and form
- Remove Stock modal and form
- Adjust Stock modal and form
- Transaction History modal
- Product creation and management
- Category filtering
- Search functionality
- API routes (`/api/backend/inventory/*`)

**Functional Areas**:
- Stock addition (PURCHASE transactions)
- Stock removal (ADJUSTMENT transactions with negative quantity)
- Stock adjustment (ADJUSTMENT transactions)
- Inventory querying (by organization, by product, by category)
- Transaction history retrieval
- Sales statistics (user-level and station-level)
- Error handling and validation
- Authentication and authorization

### 3.2 Out of Scope

- Product management (separate module)
- Category management (separate module)
- User management (separate module)
- POS system integration (separate module)
- Payment processing
- Reporting and analytics beyond sales statistics
- Performance testing under extreme load (separate performance test plan)
- Security penetration testing (separate security test plan)
- Database migration testing (covered in deployment procedures)

---

## 4. Test Approach

### 4.1 Testing Strategy

**Test-Driven Development (TDD)**: Where applicable, write tests before implementation for new features

**Risk-Based Testing**: Prioritize testing of:
1. Critical business logic (stock operations, multi-tenant isolation)
2. Data integrity (transaction tracking, quantity calculations)
3. Security (authentication, authorization, organization isolation)
4. User-facing features (inventory page, modals, forms)

**Test Pyramid**:
- 70% Unit Tests (fast, isolated, comprehensive)
- 20% Integration Tests (component interactions, database)
- 10% System/E2E Tests (critical user workflows)

### 4.2 Test Design Techniques

**Equivalence Partitioning**:
- Valid quantity values (positive numbers)
- Invalid quantity values (negative, zero, null, non-numeric)
- Valid product IDs (existing, active products)
- Invalid product IDs (non-existent, inactive, wrong organization)

**Boundary Value Analysis**:
- Minimum quantity (0, 0.0001)
- Maximum quantity (database precision limits)
- Stock removal at exact available quantity
- Stock removal exceeding available quantity

**Decision Table Testing**:
- Stock operations with various combinations of:
    - Product exists/doesn't exist
    - Product active/inactive
    - Product belongs to organization/doesn't belong
    - Sufficient/insufficient stock
    - Valid/invalid input

**State Transition Testing**:
- Inventory state transitions:
    - No inventory → Add stock → Has inventory
    - Has inventory → Remove stock → Reduced inventory
    - Has inventory → Remove all stock → Zero inventory
    - Has inventory → Adjust stock → New quantity

**Error Guessing**:
- Concurrent modifications to same inventory item
- Network failures during transactions
- Database connection failures
- Invalid authentication tokens
- Malformed request payloads

### 4.3 Test Data Management

**Test Data Strategy**:
- Use test fixtures for consistent test data
- Create isolated test data per test class/method
- Clean up test data after each test (use `@Transactional` rollback)
- Use factories/builders for entity creation

**Test Data Requirements**:
- Multiple organizations (for multi-tenant testing)
- Multiple products per organization
- Products in different categories
- Active and inactive products
- Inventory items with various quantities
- Transaction history records
- Users with different roles

---

## 5. Test Environment

### 5.1 Backend Test Environment

**Development Environment**:
- **Database**: PostgreSQL (via Docker Compose)
- **Application Server**: Spring Boot embedded server
- **Test Database**: Separate test database or in-memory H2 (for unit tests)
- **Container**: Docker container for backend service
- **Java Version**: Java 21
- **Build Tool**: Maven (`./mvnw`)

**Test Execution**:
```bash
# Run all tests
docker compose exec backend ./mvnw test

# Run specific test class
docker compose exec backend ./mvnw test -Dtest=InventoryServiceTest

# Run with coverage
docker compose exec backend ./mvnw test jacoco:report
```

**Environment Variables**:
- `SPRING_DATASOURCE_URL` - Test database connection
- `SPRING_DATASOURCE_USERNAME` - Database username
- `SPRING_DATASOURCE_PASSWORD` - Database password
- `JWT_SECRET` - JWT signing key for test tokens

### 5.2 Frontend Test Environment

**Development Environment**:
- **Node.js**: v18+ or v20+
- **Package Manager**: npm
- **Framework**: Next.js 15 with Turbopack
- **Browser**: Headless Chrome/Firefox for E2E tests
- **Test Runner**: Jest, Playwright/Cypress

**Test Execution**:
```bash
# Run unit tests
cd frontend && npm test

# Run E2E tests
cd frontend && npm run test:e2e

# Run with coverage
cd frontend && npm test -- --coverage
```

**Environment Variables**:
- `NEXT_PUBLIC_BACKEND_URL` - Backend API URL (default: `http://localhost:8080`)

### 5.3 Integration Test Environment

**Full Stack Environment**:
- **Docker Compose**: All services (PostgreSQL, Backend, Frontend)
- **Database**: Fresh test database with migrations applied
- **Backend**: Running on `http://localhost:8080`
- **Frontend**: Running on `http://localhost:3000`
- **Test Data**: Seeded via Liquibase or test fixtures

**Setup Commands**:
```bash
# Start full environment
docker compose up -d

# Apply migrations
docker compose exec backend ./mvnw liquibase:update

# Seed test data (if needed)
docker compose exec backend ./mvnw test -Dtest=TestDataSeeder
```

### 5.4 Test Data Isolation

- Each test should use isolated data (different organization IDs, product IDs)
- Use `@Transactional` with rollback for database tests
- Use unique identifiers (UUIDs, timestamps) to avoid conflicts
- Clean up test data in `@AfterEach` or `@AfterAll` methods

---

## 6. Entry and Exit Criteria

### 6.1 Entry Criteria

**Test Planning Phase**:
- Test plan document approved
- Test environment setup completed
- Test data requirements identified
- Test tools and frameworks configured

**Test Execution Phase**:
- Development code complete and committed
- Unit tests written and passing
- Test environment accessible and stable
- Test data prepared and loaded
- Test cases documented and reviewed
- Defect tracking system ready

**System Testing Phase**:
-  Integration tests passing
-  Backend API endpoints functional
-  Frontend components deployed
-  Database migrations applied
-  Authentication system working

### 6.2 Exit Criteria

**Unit Testing**:
-  All unit tests passing (100% pass rate)
-  Code coverage ≥ 80% for inventory module
-  Critical paths (add/remove/adjust stock) have 100% coverage
-  All business logic edge cases tested

**Integration Testing**:
-  All integration tests passing
-  Multi-tenant isolation verified
-  Transaction rollback scenarios tested
-  Database constraints validated
-  API contract compliance verified

**System Testing**:
-  All critical user workflows tested end-to-end
-  Cross-browser compatibility verified (Chrome, Firefox, Safari)
-  Responsive design validated (mobile, tablet, desktop)
-  Performance meets acceptance criteria (< 2s response time for inventory queries)
-  No critical or high-severity defects open

**Acceptance Testing**:
-  All user stories validated
-  Business requirements met
-  Stakeholder sign-off obtained
-  User acceptance testing (UAT) completed

**General Exit Criteria**:
-  Zero critical defects
-  Zero high-severity defects blocking release
-  Medium and low-severity defects documented and prioritized
-  Test summary report completed
-  Test artifacts archived

---

## 7. Roles and Responsibilities

### 7.1 Test Team Roles

**Test Lead**:
- Overall test planning and coordination
- Test strategy definition
- Test progress monitoring and reporting
- Risk assessment and mitigation
- Test environment setup coordination

**Backend Test Engineer**:
- Backend unit test development
- Backend integration test development
- API testing and validation
- Database testing
- Performance testing for backend services
- Test data preparation for backend

**Frontend Test Engineer**:
- Frontend unit test development
- Component integration testing
- E2E test development (Playwright/Cypress)
- UI/UX validation
- Cross-browser testing
- Responsive design testing

**QA Analyst**:
- Test case design and documentation
- Manual testing execution
- Exploratory testing
- Defect reporting and tracking
- Test result analysis
- User acceptance testing coordination

**Developer (Development Team)**:
- Unit test development alongside code
- Code review for testability
- Fixing defects identified during testing
- Providing test data and test scenarios
- Supporting test environment setup

### 7.2 Stakeholder Responsibilities

**Product Owner**:
- Requirements clarification
- Acceptance criteria definition
- User story validation
- UAT sign-off

**Scrum Master / Project Manager**:
- Test schedule coordination
- Resource allocation
- Risk escalation
- Test progress tracking

**DevOps Engineer**:
- Test environment provisioning
- CI/CD pipeline configuration for automated tests
- Test infrastructure maintenance
- Deployment support for test environments

---

## 8. Risks and Assumptions

### 8.1 Testing Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Test environment instability | High | Medium | Use Docker for consistent environments, implement health checks |
| Insufficient test data | Medium | Low | Create comprehensive test data generators, use factories |
| Time constraints limiting test coverage | High | Medium | Prioritize critical paths, automate repetitive tests |
| Complex multi-tenant scenarios not fully tested | High | Medium | Dedicate specific test suite for multi-tenant isolation |
| Database migration issues in test environment | Medium | Low | Test migrations separately, use versioned migrations |
| Concurrent access scenarios not covered | Medium | Medium | Implement load testing, use database locking tests |
| Frontend-backend integration issues | High | Medium | Early integration testing, API contract testing |
| Browser compatibility issues | Medium | Low | Cross-browser testing matrix, use browser automation |
| Performance degradation under load | Medium | Low | Performance testing with realistic data volumes |
| Security vulnerabilities in multi-tenant isolation | High | Low | Security review, penetration testing for auth |

### 8.2 Assumptions

**Technical Assumptions**:
- Test environment will be stable and available during testing period
- Docker containers will start reliably and consistently
- Database migrations will apply successfully in test environment
- Backend and frontend can be deployed independently for testing
- Test data can be created and cleaned up programmatically
- Authentication system (OAuth2/JWT) will be functional during testing

**Business Assumptions**:
- Business requirements are stable and well-documented
- Product Owner will be available for clarifications during testing
- Test scenarios align with actual user workflows
- Performance requirements are clearly defined
- Multi-tenant isolation requirements are clearly specified

**Process Assumptions**:
- Developers will write unit tests alongside code development
- Code reviews will include test coverage review
- Defects will be prioritized and fixed in a timely manner
- Test results will be communicated regularly to stakeholders
- Test documentation will be maintained and updated

### 8.3 Dependencies

**External Dependencies**:
- PostgreSQL database availability
- Docker and Docker Compose functionality
- Internet connectivity for OAuth2 authentication (if testing with real Google OAuth)
- Test user accounts and organization setup

**Internal Dependencies**:
- Product management module (for creating test products)
- Category management module (for category filtering tests)
- User management module (for user authentication and authorization)
- Bar Station module (for station sales statistics)

**Tool Dependencies**:
- Maven for backend builds
- npm for frontend builds
- Test frameworks (JUnit, Mockito, Jest, Playwright)
- CI/CD pipeline for automated test execution

---

## 9. Test Deliverables

### 9.1 Test Planning Documents

-  **Test Plan Document** (this document)
- **Test Strategy Document** (if separate from test plan)
- **Test Schedule** (timeline and milestones)
- **Test Data Plan** (test data requirements and generation strategy)

### 9.2 Test Design Documents

- **Test Case Specifications**:
    - Backend unit test cases
    - Backend integration test cases
    - Frontend unit test cases
    - Frontend integration test cases
    - E2E test scenarios
    - Manual test cases

- **Test Data Specifications**:
    - Test data requirements
    - Test data generation scripts
    - Test database schemas and seed data

### 9.3 Test Execution Artifacts

- **Test Execution Reports**:
    - Daily/weekly test progress reports
    - Test execution summary
    - Test coverage reports (code coverage metrics)

- **Defect Reports**:
    - Defect log with severity, priority, status
    - Defect analysis and trends
    - Root cause analysis for critical defects

- **Test Results**:
    - Unit test results (JUnit XML, HTML reports)
    - Integration test results
    - E2E test results (screenshots, videos for failures)
    - Performance test results (if applicable)

### 9.4 Test Automation Artifacts

- **Automated Test Scripts**:
    - Backend unit test classes (`*Test.java`)
    - Backend integration test classes
    - Frontend unit test files (`*.test.ts`, `*.test.tsx`)
    - Frontend E2E test scripts (Playwright/Cypress)
    - API test scripts (Postman/Newman collections, if used)

- **Test Configuration**:
    - Test environment configuration files
    - Test data fixtures
    - Mock/stub configurations
    - CI/CD pipeline test configurations

### 9.5 Test Completion Documents

- **Test Summary Report**:
    - Test execution summary
    - Test metrics (pass/fail rates, coverage)
    - Defect summary and status
    - Risk assessment
    - Recommendations

- **Test Sign-off Document**:
    - Test completion confirmation
    - Stakeholder approvals
    - Release readiness assessment

### 9.6 Maintenance Documents

- **Test Maintenance Plan**:
    - Test case update procedures
    - Test data refresh procedures
    - Test environment maintenance
    - Regression test suite definition

---

## 10. Test Schedule and Milestones

### 10.1 Testing Phases

**Phase 1: Unit Testing (Week 1-2)**
- Backend unit tests development and execution
- Frontend unit tests development and execution
- Code coverage analysis
- Target: 80%+ code coverage

**Phase 2: Integration Testing (Week 2-3)**
- Backend integration tests
- Frontend-backend integration tests
- Database integration tests
- API contract validation

**Phase 3: System Testing (Week 3-4)**
- E2E test development and execution
- Cross-browser testing
- Responsive design validation
- Performance testing

**Phase 4: Acceptance Testing (Week 4)**
- User acceptance testing
- Business requirement validation
- Stakeholder sign-off

### 10.2 Key Milestones

- **M1**: Test plan approval
- **M2**: Unit tests complete (80%+ coverage)
- **M3**: Integration tests passing
- **M4**: System tests complete
- **M5**: Zero critical/high defects
- **M6**: UAT sign-off
- **M7**: Test summary report complete

---

## 11. Test Metrics and Reporting

### 11.1 Test Metrics

**Coverage Metrics**:
- Code coverage percentage (target: ≥80%)
- Test case coverage (requirements coverage)
- Function/API endpoint coverage

**Execution Metrics**:
- Total test cases planned vs. executed
- Test pass/fail rates
- Test execution time
- Defect detection rate

**Defect Metrics**:
- Total defects found
- Defects by severity (Critical, High, Medium, Low)
- Defects by status (Open, In Progress, Fixed, Closed)
- Defect density (defects per KLOC)
- Defect resolution time

**Quality Metrics**:
- Test effectiveness (defects found in testing vs. production)
- Defect leakage (defects found post-release)
- Test efficiency (tests executed per day)

### 11.2 Reporting Frequency

- **Daily**: Test execution status (during active testing)
- **Weekly**: Test progress report with metrics
- **Milestone**: Comprehensive test summary
- **Final**: Test completion report with recommendations

---

## 12. Defect Management

### 12.1 Defect Severity Levels

**Critical**:
- System crash or data loss
- Security vulnerability (e.g., organization data leakage)
- Complete feature failure (e.g., cannot add stock)

**High**:
- Major feature malfunction (e.g., incorrect quantity calculations)
- Data integrity issues (e.g., transaction history missing)
- Performance degradation significantly impacting usability

**Medium**:
- Partial feature malfunction (e.g., category filter not working for some cases)
- UI/UX issues affecting usability
- Error messages not user-friendly

**Low**:
- Minor UI issues (e.g., alignment, spacing)
- Cosmetic issues
- Documentation gaps

### 12.2 Defect Lifecycle

1. **New**: Defect reported
2. **Assigned**: Assigned to developer
3. **In Progress**: Developer working on fix
4. **Fixed**: Fix implemented, ready for retest
5. **Retest**: QA verifying fix
6. **Closed**: Defect verified fixed
7. **Reopened**: Defect still exists after fix
8. **Deferred**: Fix postponed to future release

### 12.3 Defect Tracking

- Use issue tracking system (Jira, GitHub Issues, etc.)
- Include: ID, title, description, severity, priority, steps to reproduce, expected vs. actual results, environment, screenshots/logs
- Link defects to test cases
- Track defect trends and root causes

---

## 13. Test Tools and Frameworks

### 13.1 Backend Testing Tools

- **JUnit 5**: Unit and integration testing framework
- **Mockito**: Mocking framework for unit tests
- **Spring Boot Test**: Integration testing support
- **Testcontainers**: Docker-based integration testing (PostgreSQL)
- **AssertJ**: Fluent assertions
- **JaCoCo**: Code coverage analysis
- **Maven**: Build and test execution

### 13.2 Frontend Testing Tools

- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Playwright / Cypress**: E2E testing
- **MSW (Mock Service Worker)**: API mocking for unit tests
- **npm**: Package management and test execution

### 13.3 API Testing Tools

- **Spring MockMvc**: Backend API testing
- **Postman / Newman**: API testing and collections (optional)
- **REST Assured**: API testing library (if needed)

### 13.4 Test Management Tools

- **GitHub Issues / Jira**: Defect tracking
- **Git**: Version control for test code
- **CI/CD Pipeline**: Automated test execution (GitHub Actions, GitLab CI, etc.)

---

## 14. Appendix

### 14.1 Test Case Examples

**Example: Add Stock - Success Case**
- **Test ID**: INV-UT-001
- **Description**: Verify that adding stock to an existing inventory item increases the quantity correctly
- **Preconditions**: Product exists, inventory exists with quantity = 10
- **Test Steps**:
    1. Call `POST /api/inventory/add` with productId=1, quantity=5
    2. Verify response status = 201 CREATED
    3. Verify response quantity = 15
    4. Verify transaction record created with type=PURCHASE
- **Expected Result**: Stock added successfully, quantity updated, transaction recorded
- **Priority**: High

**Example: Remove Stock - Insufficient Stock**
- **Test ID**: INV-UT-002
- **Description**: Verify that removing more stock than available returns an error
- **Preconditions**: Inventory exists with quantity = 5
- **Test Steps**:
    1. Call `POST /api/inventory/remove` with productId=1, quantity=10
    2. Verify response status = 400 BAD REQUEST
    3. Verify error message indicates insufficient stock
    4. Verify inventory quantity unchanged (still 5)
- **Expected Result**: Error returned, no stock removed
- **Priority**: High

### 14.2 Glossary

- **Inventory**: Current stock quantity for a product in an organization
- **Inventory Transaction**: Audit record of inventory changes
- **Multi-Tenant**: Architecture where each organization's data is isolated
- **Organization**: A tenant in the multi-tenant system (e.g., a bar/restaurant)
- **Product**: An item that can be tracked in inventory
- **Stock**: Quantity of a product available in inventory
- **Transaction Type**: Type of inventory change (PURCHASE, ADJUSTMENT, SALE)

### 14.3 References

- Borsibaar Project Repository Rules
- Spring Boot Testing Documentation
- Next.js Testing Documentation
- JUnit 5 User Guide
- React Testing Library Documentation
- Playwright Documentation

---

## Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Test Lead | | | |
| Development Lead | | | |
| Product Owner | | | |
| QA Manager | | | |

---

**Document Version History**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024 | Test Team | Initial test plan creation |
