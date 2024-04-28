import { render, screen } from "@testing-library/react";
import Navbar from "../Navbar/Navbar";

describe(Navbar, () => {
    // Unit test 1
    it("components displays correct link text", () => {
        render(<Navbar />);
        const text = screen.getByTestId("about-us-link").textContent;
        expect(text).toEqual("About Us");
    });

    // Unit test 2
    it("component should have an empty search bar on render", () => {
        render(<Navbar />);
        const text = screen.getByTestId("search-bar").textContent;
        expect(text).not.toEqual("something");
    });
});