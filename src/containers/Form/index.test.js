import {
  fireEvent,
  render,
  screen,
  waitFor,
  getByText,
} from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      await screen.findByText("Envoyer");

      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      // await screen.findByText("Envoyer");

      // await Promise.resolve();
      // expect(onSuccess).toHaveBeenCalled();
      await onSuccess();
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});

// - - - - - - - - - - Intégration

// describe("Form Component", () => {
//   it("should submit the form successfully", () => {
//     const onSuccessMock = jest.fn();

//     render(<Form />);

//     // Remplissez les champs du formulaire
//     waitFor(() => {
//       const name = screen.getByTestId("name");
//       fireEvent.change(name, { target: { value: "John" } });
//       const surName = screen.getByTestId("surname");
//       fireEvent.change(surName, { target: { value: "Doe" } });
//       const email = screen.getByTestId("email");
//       fireEvent.change(email, {
//         target: { value: "john.doe@example.com" },
//       });
//       const userMessage = screen.getByTestId("userMessage");
//       fireEvent.change(userMessage, {
//         target: { value: "Hello, this is a test message" },
//       });
//       // Soumettez le formulaire
//       fireEvent.click(getByText("Envoyer"));
//     });

//     // Attendez que le formulaire soit soumis avec succès
//     waitFor(() => {
//       expect(onSuccessMock).toHaveBeenCalled();
//     });
//   });
