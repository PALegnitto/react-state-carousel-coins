import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";


it("renders without crashing", function () {
  // this is a low-value test, but better than nothing
  render(<Carousel photos= {TEST_IMAGES} title="images for testing" /> );
});

it("matches snapshot", function () {
  const { container } = render(<Carousel photos= {TEST_IMAGES} title="images for testing" /> );
  expect(container).toMatchSnapshot();
});

it("reverts to previous image when clicking left arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

   // expect the second image to show, but not the first
   expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

  // move backward in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
});


it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("removes right arrow when on last image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);


  // expect the third image to show
  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).toBeInTheDocument();

  // expect the second image to show, but not the first
  expect(
    container.querySelector(".bi-arrow-right-circle")
  ).not.toBeInTheDocument();
  expect(
    container.querySelector(".bi-arrow-left-circle")
  ).toBeInTheDocument();
});

it("removes left arrow when on first image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // expect the first iamge to show
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();

  // expect the second image to show, but not the first
  expect(
    container.querySelector(".bi-arrow-left-circle")
  ).not.toBeInTheDocument();
  expect(
    container.querySelector(".bi-arrow-right-circle")
  ).toBeInTheDocument();
});
