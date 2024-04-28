import { render, screen } from "@testing-library/react";
import PersonalProfile from "../Pages/Profile/PersonalProfile";

describe(PersonalProfile, () => {
    // Unit test 1
    it("components displays correct link text", () => {
        render(<PersonalProfile />);
        const text = screen.getByTestId("user-name").textContent;
        expect(text).toEqual("Marie Horwitz");
    });
});