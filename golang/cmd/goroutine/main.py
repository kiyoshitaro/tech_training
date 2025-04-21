import time
import random
from concurrent.futures import ThreadPoolExecutor

# Function to multiply two matrices without concurrency
def multiply_matrices(a, b):
    size = len(a)
    result = [[0] * size for _ in range(size)]

    for i in range(size):
        for j in range(size):
            sum = 0
            for k in range(size):
                sum += a[i][k] * b[k][j]
            result[i][j] = sum
    return result

# Function to multiply a single row of two matrices concurrently
def multiply_row(a, b, result, row):
    size = len(a)
    for j in range(size):
        sum = 0
        for k in range(size):
            sum += a[row][k] * b[k][j]
        result[row][j] = sum

# Function to multiply two matrices using concurrency
def multiply_matrices_concurrent(a, b):
    size = len(a)
    result = [[0] * size for _ in range(size)]
    with ThreadPoolExecutor() as executor:
        futures = [executor.submit(multiply_row, a, b, result, i) for i in range(size)]
        for future in futures:
            future.result()
    return result

# Example usage
size = 500
a = [[random.randint(0, 100) for _ in range(size)] for _ in range(size)]
b = [[random.randint(0, 100) for _ in range(size)] for _ in range(size)]

# Measure time for non-concurrent execution
start = time.time()
result = multiply_matrices(a, b)
end = time.time()
print(f"Time taken without multithreading: {end - start} seconds")

# Measure time for concurrent execution
start = time.time()
result = multiply_matrices_concurrent(a, b)
end = time.time()
print(f"Time taken with multithreading: {end - start} seconds")
