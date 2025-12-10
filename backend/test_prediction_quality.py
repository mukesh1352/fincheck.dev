# ---------------------------------------------
# Test file for prediction quality metrics
# Author: Rathna
# ---------------------------------------------

from benchmarking.prediction_quality import get_prediction_quality


def print_result(probabilities):
    print("\nInput probabilities:", probabilities)
    result = get_prediction_quality(probabilities)
    print("Output:", result)


def main():
    print("=== Testing Prediction Quality Module ===")

    # Test 1: Normal distribution
    print_result([0.1, 0.2, 0.7])

    # Test 2: Uniform probabilities
    print_result([0.25, 0.25, 0.25, 0.25])

    # Test 3: High-confidence prediction
    print_result([0.99, 0.005, 0.005])

    # Test 4: Slightly noisy prediction
    print_result([0.4, 0.35, 0.25])

    print("\n=== All tests completed ===")


if __name__ == "__main__":
    main()
