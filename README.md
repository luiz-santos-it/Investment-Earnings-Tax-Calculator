
# Investment Earnings Tax Calculator

## Description

This project calculates the investment earnings tax on stock market operations. The program reads buy and sell operations in JSON format from standard input (stdin) and calculates the tax owed according to specified rules. The program's output is a list of JSON objects, each representing the calculated tax for the corresponding operation, and it is sent to standard output (stdout).

### Example Input and Output

#### Input

```json
[
  { "operation": "buy", "unit-cost": 10.0, "quantity": 10000 },
  { "operation": "sell", "unit-cost": 20.0, "quantity": 5000 }
]
```

#### Output

```json
[{ "tax": 0 }, { "tax": 10000 }]
```

## Technical and Architectural Decisions

### Technical Choices

- **Docker Multi-Stage Build**: The decision to use multi-stage builds in Docker was made to optimize the image build process, reducing the final image size. This method includes only the necessary artifacts for running the application, resulting in leaner images.

- **Language**: I chose JavaScript (Node.js) for its familiarity and suitability for creating CLI applications due to its ease of implementation. Node.js uses a non-blocking, event-driven I/O model, making it highly efficient for input/output operations like file reading and writing. The code utilizes the readline module in combination with fs.createReadStream to efficiently read and process the file line by line. The readline module creates an event-driven interface ('line' and 'close'), allowing the program to continue executing other tasks while processing file lines.

- **Node.js Version**: Node.js 18 is required for this project due to its advanced features:
  - **Access Modifiers for Fields and Methods**: Allow proper encapsulation of class properties and methods.
  - **Built-in `assert` Library**: Used for assertions in tests, eliminating the need for external testing libraries.
  - **Path Alias in `package.json`**: Simplifies the organization of imports and improves code readability:
    ```json
    "imports": {
      "#domain/*": "./src/domain/*",
      "#application/*": "./src/application/*"
    }
    ```

### Project Structure

The project's directory structure is modularized, focusing on business functionalities. This approach facilitates maintenance, scalability, and understanding of the code. Modularization helps keep responsibilities well-defined and separated, making the code more readable and easier to test.

- **src/**: Contains the application source code, organized into modules.
  - **domain/**: Contains business logic.
  - **application/**: Manages state and coordinates operations.
  - **infra/**: Contains the application entry point (index.js), which uses readline for file reading, and object factories.
- **test/**: Contains unit and integration tests.
- **Dockerfile**: Defines the Docker environment to build and run the application.
- **package.json**: Manages project dependencies and execution scripts.

#### Base Class for Operations

To facilitate extensibility and code maintenance, I opted to use a base class for operations. This decision allows the creation of new operations that can inherit common functionalities from the base class, promoting code reuse.

- **Extensibility**: Separating operations into subclasses makes it easier to add new operations in the future. Additionally, using a base class puts the Open-Closed Principle of SOLID into practice, where creating a new operation like 'loan' does not require modifying existing classes but extending the base class.
- **Factory Design Pattern**: I applied the Factory design pattern to create specific operations. This pattern allows object creation without exposing the instantiation logic, making the system more flexible for introducing new operations.

#### Strategy Design Pattern

I used the Strategy design pattern to encapsulate tax calculation algorithms, allowing different operations to use different calculation strategies.

- **Flexibility**: The Strategy pattern allows tax calculation to be easily changed or extended in the future. For example, tax calculation may vary depending on the type of operation, region, or other rules that may be introduced.
- **Scalability**: By using the Strategy pattern, the system can easily accommodate new tax calculation rules without major refactoring, promoting a robust and scalable design.

## Instructions to Build and Run the Project

### Using Docker

1. **Build the Docker Image**:

    ```sh
    docker build -t investment-earnings-tax-calculator .
    ```

2. **Run the Container**:

    ```sh
    docker run -it --rm investment-earnings-tax-calculator
    ```

### Without Docker

1. **Install Dependencies**:

    ```sh
    npm install
    ```

2. **Run the Application**:

    ```sh
    npm start
    ```

## Instructions to Run Tests

### Using Docker

1. **Run the Tests**:

    ```sh
    docker run -it --rm investment-earnings-tax-calculator npm test
    ```

### Without Docker

1. **Run the Tests**:

    ```sh
    npm test
    ```

## Additional Notes

- Ensure the input is in the correct format as specified.
- The Docker image is based on Node.js 18 and includes all necessary dependencies to run the application and tests.
- No external libraries or frameworks were used.
- By default, the application uses the file `inputs/input.txt` as input. If you want to use a different file, provide the file path when running the `npm start` command or when running the Docker container.

    Using npm start:

    ```sh
    npm start path/to/your/input-file.txt
    ```

    Using Docker:

    ```sh
    docker run -it --rm investment-earnings-tax-calculator path/to/your/input-file.txt
    ```

## System Requirements

- Node.js (v18 or higher): https://nodejs.org
- Docker (optional): https://docs.docker.com/get-docker
