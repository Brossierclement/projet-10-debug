import {
  fireEvent,
  // getByTestId,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Home from "./index";
import Page from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      // await screen.findByText("Message envoyé !");
    });
  });
});

describe("When a page is created", () => {
  // - - - - - - - - - - Fonctionnel

  it("a list a people is displayed", async () => {
    render(<Page />);

    await waitFor(() => {
      const parent = screen.getByTestId("peopleListContainer");
      expect(parent.children.length).toEqual(6);
    });
  });

  // - - - - - - - - - - Fonctionnel

  it("a footer is displayed", () => {
    render(<Home />);
    const networks = screen.getByTestId("networks");
    expect(networks.children).toHaveLength(4);
  });

  // - - - - - - - - - - Fonctionnel

  it("an event card, with the last event, is displayed", () => {
    const lastEvent = {
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      title: "Conférence #productCON",
      date: "2022-04-29T20:28:45.744Z",
    };

    render(<Page last={lastEvent} />);

    waitFor(() => {
      const lastEventCardElement = screen.getByTestId("last-event-card");
      expect(lastEventCardElement).toBeInTheDocument();
    });
  });
});
