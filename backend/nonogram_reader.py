import cv2
import numpy as np
import math


def find_largest_square(image_path):
    # Load the image
    image = cv2.imread(image_path)
    original_image = image.copy()  # Copy the original image to draw contours on

    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply GaussianBlur to reduce noise and improve edge detection
    blurred = cv2.GaussianBlur(gray, (11, 11), 0)
    cv2.imshow("blourred", blurred)

    # Use Canny to  edges
    edges = cv2.Canny(blurred, 50, 150)
    # cv2.imshow("edges", edges)
    # cv2.waitKey(0)

    sobelx = cv2.Sobel(gray, cv2.CV_64F, 1, 0)
    sobely = cv2.Sobel(gray, cv2.CV_64F, 0, 1)

    # Find contours in the edges image
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

    # lines = cv2.HoughLines(edges, 1.5, np.pi / 180, 200)
    # cdst = cv2.cvtColor(edges, cv2.COLOR_GRAY2BGR)

    # if lines is not None:
    #     for i in range(0, len(lines)):
    #         rho = lines[i][0][0]
    #         theta = lines[i][0][1]
    #         a = math.cos(theta)
    #         b = math.sin(theta)
    #         x0 = a * rho
    #         y0 = b * rho
    #         pt1 = (int(x0 + 1000 * (-b)), int(y0 + 1000 * (a)))
    #         pt2 = (int(x0 - 1000 * (-b)), int(y0 - 1000 * (a)))
    #         cv2.line(cdst, pt1, pt2, (0, 0, 255), 3, cv2.LINE_AA)
    # print(lines[0])
    # cv2.imshow("Detected Lines (in red) - Standard Hough Line Transform", cdst)
    # cv2.waitKey(0)

    # Initialize variable to store the largest square
    largest_square = None
    max_area = 0

    cv2.drawContours(original_image, contours, -1, (255, 0, 0), 3)
    cv2.imshow("contours", original_image)
    cv2.waitKey(0)

    # # Display the image with contours and the largest square highlighted
    # cv2.imshow("Contours and Largest Square", original_image)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()

    # Loop over the contours
    for contour in contours:
        # Approximate the contour with an accuracy proportional to the contour perimeter
        epsilon = 0.02 * cv2.arcLength(contour, True)
        approx = cv2.approxPolyDP(contour, epsilon, True)

        # Check if the approximated contour has 4 points (a square or rectangle)
        if len(approx) == 4:
            # Use cv2.boundingRect to get the dimensions of the square
            x, y, w, h = cv2.boundingRect(approx)

            # Check if it's roughly a square (width and height are similar)
            aspect_ratio = float(w) / h
            if 0.9 <= aspect_ratio <= 1.1:  # Adjust tolerance as needed
                area = w * h
                # Update the largest square if the current one is bigger
                if area > max_area:
                    max_area = area
                    largest_square = approx

    # Draw all contours on the original image

    # if largest_square is not None:
    #     # Highlight the largest square in green
    #     cv2.drawContours(original_image, [largest_square], -1, (0, 255, 0), 2)


# Example usage
find_largest_square("../nonogram.png")
