import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9; // détermine combien d'événements seront affichés par page.

const EventList = () => {
  const { data, error } = useData(); // récupération des données à partir du contexte.
  const [type, setType] = useState(); // initialise un état local, type = undefined.
  const [currentPage, setCurrentPage] = useState(1); // initialise un état local, currentPage = 1.

  /* filtre les événements en fonction de la catégorie (type)
     et de la page courante (currentPage) */
  const filteredEvents = (data?.events || []) // data?.events || [] vérifie si data est défini et s'il contient un [] 'events'
    .filter((event) => {
      // méthode qui itère sur chaque événement dans le tableau et retourne un nouveau tableau contenant les événements correspondants au filtrage.
      if (!type || event.type === type) {
        // vérifie si 'type' n'est pas défini ou si le type de l'événement correspond à la catégorie sélectionnée.
        return true;
      }
      return false;
    })
    .slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE); // découpe le tableau filtrés en fonction de la page courante et du PER_PAGE.
  const changeType = (evtType) => {
    // quand nouvelle catégorie sélectionnée, evtType = nouvelle catégorie et currentPage = 1 pour revenir au début.
    setCurrentPage(1);
    setType(evtType);
  };
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1; // calc nb total pages (nb évents filtrés / PER_PAGE), math.floor s'assure que résultat = entier.
  const typeList = new Set(
    data?.events.map((event) => event.type)
  ); /* crée ensemble 'Set' = catégorie d'évents uniques. Extraction via '.map((event)) puis stock dans 'typeList'.
  Cela génére la des liste des catégories dispo.
  */
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                    // periode={event.periode}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
