import { render, screen } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

describe("When slider is created", () => {
  it("a list card is displayed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
    await screen.findByText("World economic forum");
    await screen.findByText("janvier");
    await screen.findByText(
      "Oeuvre à la coopération entre le secteur public et le privé."
    );
  });
});

// - - - - - Scénario n°2 - - - - -

describe("Slider component", () => {
  it("devrait correspondre aux boutons radio", () => {
    const { getByRole } = render(<Slider />);
    const sliderItems = [
      {
        id: 0,
        inputId: "a",
        alt: "world",
      },
      {
        id: 1,
        inputId: "b",
        alt: "nordic",
      },
      {
        id: 2,
        inputId: "c",
        alt: "Sneakercraze",
      },
    ];

    // Récupère les boutons radio
    const radioButtons = document.querySelectorAll('input[type="radio"]');

    // Vérification des boutons radio par rapport aux slides.
    radioButtons.forEach((radioButton, index) => {
      fireEvent.click(radioButton); // Clique sur le bouton radio
      const slideAlt = sliderItems[index].alt;
      const slide = getByRole("img", { name: new RegExp(slideAlt, "i") });

      // Regarde si la slide correspondante est visible
      if (index === 0) {
        // Si c'est le premier bouton radio, la première slide doit être visible
        expect(slide).toBeVisible();
      } else {
        // Les autres diapositives ne doivent pas être visibles
        expect(slide).not.toBeVisible();
      }
    });
  });
});
