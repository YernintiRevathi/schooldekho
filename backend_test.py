import requests
import sys
import json
from datetime import datetime

class SchoolDekhoAPITester:
    def __init__(self, base_url="http://localhost:8001"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append(f"{name}: Expected {expected_status}, got {response.status_code}")

            return success, response.json() if success and response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append(f"{name}: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test health endpoint"""
        return self.run_test("Health Check", "GET", "api/health", 200)

    def test_get_schools(self):
        """Test getting schools list"""
        return self.run_test("Get Schools", "GET", "api/schools", 200)

    def test_get_schools_with_filters(self):
        """Test getting schools with filters"""
        params = {
            "page": 1,
            "limit": 5,
            "school_type": "Day School",
            "board": "CBSE"
        }
        return self.run_test("Get Schools with Filters", "GET", "api/schools", 200, params=params)

    def test_get_filter_options(self):
        """Test getting filter options"""
        return self.run_test("Get Filter Options", "GET", "api/filters/options", 200)

    def test_get_school_by_id(self):
        """Test getting a specific school - first get schools then test one"""
        success, schools_data = self.test_get_schools()
        if success and schools_data.get('schools'):
            school_id = schools_data['schools'][0].get('id')
            if school_id:
                return self.run_test("Get School by ID", "GET", f"api/schools/{school_id}", 200)
        
        # If no schools found, test with a dummy ID to see error handling
        return self.run_test("Get School by ID (Not Found)", "GET", "api/schools/dummy-id", 404)

    def test_compare_schools(self):
        """Test school comparison"""
        # First get some schools
        success, schools_data = self.run_test("Get Schools for Comparison", "GET", "api/schools", 200, params={"limit": 3})
        
        if success and schools_data.get('schools') and len(schools_data['schools']) >= 2:
            school_ids = [school['id'] for school in schools_data['schools'][:2]]
            return self.run_test("Compare Schools", "POST", "api/schools/compare", 200, data=school_ids)
        else:
            # Test with dummy IDs
            return self.run_test("Compare Schools (Dummy)", "POST", "api/schools/compare", 400, data=["dummy1", "dummy2"])

    def test_user_registration(self):
        """Test user registration"""
        user_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": f"test{datetime.now().strftime('%H%M%S')}@example.com",
            "phone": "9876543210",
            "user_type": "parent",
            "location": {
                "city": "Mumbai",
                "state": "Maharashtra"
            }
        }
        return self.run_test("User Registration", "POST", "api/users/register", 200, data=user_data)

    def test_loan_application(self):
        """Test loan application"""
        loan_data = {
            "user_id": "test-user-123",
            "school_id": "test-school-123",
            "student_name": "Test Student",
            "student_age": 10,
            "class_applying_for": "5th Grade",
            "loan_amount": 100000,
            "family_income": 500000,
            "documents": ["aadhar.pdf", "income_certificate.pdf"]
        }
        return self.run_test("Loan Application", "POST", "api/loans/apply", 200, data=loan_data)

    def test_get_user_loans(self):
        """Test getting user loans"""
        return self.run_test("Get User Loans", "GET", "api/loans/test-user-123", 200)

    def test_get_alumni(self):
        """Test getting alumni for a school"""
        return self.run_test("Get School Alumni", "GET", "api/alumni/test-school-123", 200)

def main():
    print("🚀 Starting SchoolDekho API Testing...")
    print("=" * 50)
    
    tester = SchoolDekhoAPITester()
    
    # Run all tests
    test_methods = [
        tester.test_health_check,
        tester.test_get_schools,
        tester.test_get_schools_with_filters,
        tester.test_get_filter_options,
        tester.test_get_school_by_id,
        tester.test_compare_schools,
        tester.test_user_registration,
        tester.test_loan_application,
        tester.test_get_user_loans,
        tester.test_get_alumni
    ]
    
    for test_method in test_methods:
        try:
            test_method()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
            tester.failed_tests.append(f"{test_method.__name__}: {str(e)}")
    
    # Print final results
    print("\n" + "=" * 50)
    print("📊 FINAL TEST RESULTS")
    print("=" * 50)
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Tests Failed: {tester.tests_run - tester.tests_passed}")
    
    if tester.failed_tests:
        print("\n❌ FAILED TESTS:")
        for failed_test in tester.failed_tests:
            print(f"   - {failed_test}")
    
    success_rate = (tester.tests_passed / tester.tests_run * 100) if tester.tests_run > 0 else 0
    print(f"\nSuccess Rate: {success_rate:.1f}%")
    
    return 0 if success_rate > 80 else 1

if __name__ == "__main__":
    sys.exit(main())