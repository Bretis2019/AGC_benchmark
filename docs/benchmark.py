import numpy as np
import time
import json
import sys

def main():
    # Read the input file
    script_path = sys.argv[1]

    with open(script_path, 'r') as f:
        script_code = f.read()

    # Generate a large array of random numbers
    n = 1000000
    a = np.random.rand(n)
    b = np.random.rand(n)

    # Time how long it takes to perform a dot product
    start_time = time.time()
    c = np.dot(a, b)
    end_time = time.time()

    # Calculate the FLOPS score
    flops_score = n**2 / (end_time - start_time)

    # Return the benchmark score as a JSON object
    result = {'score': flops_score}
    print(json.dumps(result))

if __name__ == '__main__':
    main()
