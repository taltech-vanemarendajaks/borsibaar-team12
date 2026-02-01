# Test Plan – Sales Transaction Processing

**Project:** Borsibaar  
**Team:** Team 12  
**Testing Level:** System Testing (Manual)

---

## 1. Testing Objectives

The purpose of this test plan is to verify that the Sales Transaction Processing functionality works correctly in the Borsibaar application.

Objectives:
- Ensure a sales transaction can be successfully created through the UI.
- Verify that transaction data is stored correctly in the system.
- Confirm that totals and quantities are calculated correctly.
- Validate that inventory is updated after a sale (if applicable).
- Ensure proper validation and error handling for incorrect inputs.

---

## 2. Testing Level

System Testing (Manual)

The application will be tested as a complete system (frontend + backend + database) by executing real user actions in the user interface.

No automated testing tools are used for this scope.

---

## 3. Test Scope

### 3.1 In Scope

Feature under test: Sales Transaction Processing

Covered scenarios:
- Opening the Sales/POS page
- Creating a sales transaction with one product
- Creating a sales transaction with multiple products (if supported)
- Verifying transaction appears in sales history
- Verifying correct calculation of totals
- Verifying inventory is updated after sale (if applicable)
- Validation of invalid inputs (e.g., negative quantity, missing product)

### 3.2 Out of Scope

- Unit testing of backend services
- Integration testing of API endpoints
- Performance or load testing
- Advanced security testing
- Cross-browser testing beyond basic validation

---

## 4. Test Approach

Testing will be performed manually using a web browser.

- Each test case will be executed step-by-step.
- Results will be recorded as Pass / Fail.
- Defects will be reported in GitHub Issues with:
  - Steps to reproduce
  - Expected result
  - Actual result
  - Screenshot (if needed)

---

## 5. Test Environment

- Application running locally using Docker Compose or project setup.
- Database: PostgreSQL (default project configuration).
- Browser: Google Chrome (latest version).
- Test data:
  - At least 1–3 products available for sale.
  - A test user account (if login is required).

---

## 6. Entry and Exit Criteria

### Entry Criteria

- Application starts successfully.
- Sales/POS page is accessible.
- Products exist in the system for testing.

### Exit Criteria

- All planned test cases have been executed.
- No open Critical or High severity defects related to sales transactions.
- Test results are documented.

---

## 7. Roles and Responsibilities

Team Members:
- Execute test cases
- Document results
- Report defects
- Provide short test summary

Developers:
- Fix identified issues
- Support re-testing

---

## 8. Risks and Assumptions

### Risks

- Sales processing depends on correct inventory state.
- Incorrect test data may affect results.
- Authentication issues may block access to the Sales page.

### Assumptions

- The system allows creation of sales transactions through the UI.
- Transactions are stored in the database and can be reviewed in history.
- Inventory is automatically updated after sale (if designed that way).

---

# Appendix – Sales Transaction Test Cases

### TC1 – Open Sales Page
Steps:
1. Navigate to Sales/POS page.

Expected Result:
- Page loads successfully without errors.

---

### TC2 – Create Sale with One Product
Steps:
1. Select product A.
2. Enter quantity = 1.
3. Complete sale.

Expected Result:
- Sale is processed successfully.
- Confirmation is shown.

---

### TC3 – Verify Sale in History
Steps:
1. Open Sales History page.
2. Locate recently created transaction.

Expected Result:
- Transaction appears with correct product and quantity.

---

### TC4 – Verify Total Calculation
Steps:
1. Note product price.
2. Create sale with known quantity.
3. Compare calculated total.

Expected Result:
- Total equals price × quantity.

---

### TC5 – Multiple Products in One Sale (if supported)
Steps:
1. Add product A and product B.
2. Complete sale.

Expected Result:
- Sale includes both products.
- Correct totals displayed.

---

### TC6 – Invalid Quantity
Steps:
1. Enter quantity = 0 or negative value.
2. Attempt to complete sale.

Expected Result:
- Error message displayed.
- Sale is not processed.

---

### TC7 – Insufficient Stock (if applicable)
Steps:
1. Attempt to sell more than available stock.

Expected Result:
- Validation error shown.
- Sale is prevented.

---

### TC8 – Inventory Update After Sale (if applicable)
Steps:
1. Note stock level before sale.
2. Complete sale.
3. Check inventory.

Expected Result:
- Stock decreases according to sold quantity.
