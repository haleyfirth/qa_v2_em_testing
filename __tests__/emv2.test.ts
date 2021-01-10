import { EmployeeManager, Employee } from "./pageObjects/EmployeeManager";

const employees: Array<Employee> = [
  {
    name: "Han Solo",
    phone: 1111111111,
    email: "millenium@falcon.rep",
    title: "Smuggler",
  },
  {
    name: "Luke Skywalker",
    phone: 2222222222,
    email: "red5@rogue.rep",
    title: "Jedi",
  },
  {
    name: "Thrawn",
    phone: 3333333333,
    email: "gathrawn@admiralty.emp",
    title: "Best Villain",
  },
  {
    name: "R2-D2",
    phone: 4444444444,
    email: "pottymouth@astromech.rep",
    title: "Crotchety Old Droid",
  },
];

describe("employee manager v2", () => {
  const page = new EmployeeManager({ browser: "chrome" });
  beforeEach(async () => {
    await page.navigate();
  });
  afterAll(async () => {
    await page.driver.quit();
  });
  test("Searching narrows the list", async () => {
    let originalList = await page.getEmployeeList();
    await page.searchFor("Bill");
    let resultList = await page.getEmployeeList();
    expect(originalList.length).toBeGreaterThanOrEqual(resultList.length);
  });
  test("Screenshotting the 'screenshot' employees", async () => {
    
    await page.searchFor("Screenshot");
    
    await page.takeScreenshot("screenshots/screenshot");
  });
  employees.forEach((newEmployee) => {
  
    test(` add and delete an employee (newEmployee.name)`, async () => {
      await page.addEmployee(newEmployee);
      let employee = await page.getCurrentEmployee();
      expect(employee.name).toEqual(newEmployee.name);
      expect(employee.phone).toEqual(newEmployee.phone);
      expect(employee.email).toEqual(newEmployee.email);
      expect(employee.title).toEqual(newEmployee.title);
      
      await page.deleteEmployee(newEmployee.name);
      let employeeList = await page.getEmployeeList();

      expect(employeeList).not.toContain(newEmployee.name);
    });
  });
}); 
