import {
  faAppleCrate,
  faBeer,
  faCheese,
  faCookieBite,
  faFrenchFries,
  faGlassChampagne,
  faGlassCitrus,
  faHatChef,
  faJug,
  faPig,
  faSack,
  faSausage,
  faTurkey,
  faWineBottle,
} from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const categories = [
  {
    name: "Rôtisserie - Rustizzeria",
    slug: "aujourd'hui",
    icon: (
      <FontAwesomeIcon
        size="4x"
        icon={faTurkey}
        style={{
          "--fa-primary-color": "#AF2127",
          "--fa-secondary-color": "grey",
        }}
      />
    ),
  },
  {
    name: "L'Épicerie -Buttega-",
    slug: "epicerie",
    icon: (
      <FontAwesomeIcon
        size="4x"
        icon={faAppleCrate}
        style={{
          "--fa-primary-color": "#AF2127",
          "--fa-secondary-color": "grey",
        }}
      />
    ),
    subCategories: [
      {
        name: "Les Salés \n-  I Salati",
        slug: "salés-p",
        icon: (
          <FontAwesomeIcon
            size="3x"
            icon={faFrenchFries}
            style={{ "--fa-primary-color": "darkred" }}
          />
        ),
      },
      {
        name: "Les Petits Pots - I Chjuci Bombuli",
        slug: "pots-p",
        icon: (
          <FontAwesomeIcon
            size="3x"
            icon={faHatChef}
            style={{ "--fa-primary-color": "darkred" }}
          />
        ),
      },
      {
        name: "Les Huiles et Vinaigres - I Olii I Aceti ",
        slug: "huile-et-vinaigres-p",
        icon: (
          <FontAwesomeIcon
            size="3x"
            icon={faJug}
            style={{ "--fa-primary-color": "darkred" }}
          />
        ),
      },
      {
        name: "Les Assaisonements - I Cundimenti",
        slug: "assaisonements-p",
        icon: (
          <FontAwesomeIcon
            size="3x"
            icon={faSack}
            style={{ "--fa-primary-color": "darkred" }}
          />
        ),
      },
      {
        name: "Les Terrines - I Terrine",
        slug: "terrines-p",
        icon: (
          <FontAwesomeIcon
            size="3x"
            icon={faPig}
            style={{ "--fa-primary-color": "darkred" }}
          />
        ),
      },
      {
        name: "Les Charcuteries - A Robba Purcina",
        slug: "charcuteries-p",
        icon: (
          <FontAwesomeIcon
            size="3x"
            icon={faSausage}
            style={{ "--fa-primary-color": "darkred" }}
          />
        ),
      },
      {
        name: "Les Fromages - I Casgii",
        slug: "fromages-p",
        icon: (
          <FontAwesomeIcon
            size="3x"
            icon={faCheese}
            style={{ "--fa-primary-color": "darkred" }}
          />
        ),
      },
      {
        name: "Les Douceurs - I Dolci",
        slug: "douceurs-p",
        icon: (
          <FontAwesomeIcon
            size="3x"
            icon={faCookieBite}
            style={{ "--fa-primary-color": "darkred" }}
          />
        ),
      },
    ],
  },
  // {
  //   name: "Assiettes à composer",
  //   slug: "spuntinu",
  //   details: "À partir de 18h",
  //   icon: (
  //     <FontAwesomeIcon
  //       size="4x"
  //       icon={faPig}
  //       style={{
  //         "--fa-primary-color": "#AF2127",
  //         "--fa-secondary-color": "grey",
  //       }}
  //     />
  //   ),
  //   subCategories: [
  //     {
  //       name: "Les Salés",
  //       slug: "salés",
  //       icon: (
  //         <FontAwesomeIcon
  //           size="3x"
  //           icon={faFrenchFries}
  //           style={{ "--fa-primary-color": "darkred" }}
  //         />
  //       ),
  //     },
  //     {
  //       name: "Les Petits Pots",
  //       slug: "pots",
  //       icon: (
  //         <FontAwesomeIcon
  //           size="3x"
  //           icon={faHatChef}
  //           style={{ "--fa-primary-color": "darkred" }}
  //         />
  //       ),
  //     },
  //     {
  //       name: "Les Terrines",
  //       slug: "terrines",
  //       icon: (
  //         <FontAwesomeIcon
  //           size="3x"
  //           icon={faPig}
  //           style={{ "--fa-primary-color": "darkred" }}
  //         />
  //       ),
  //     },
  //     {
  //       name: "Les Charcuteries",
  //       slug: "charcuteries",
  //       icon: (
  //         <FontAwesomeIcon
  //           size="3x"
  //           icon={faSausage}
  //           style={{ "--fa-primary-color": "darkred" }}
  //         />
  //       ),
  //     },
  //     {
  //       name: "Les Fromages",
  //       slug: "fromages",
  //       icon: (
  //         <FontAwesomeIcon
  //           size="3x"
  //           icon={faCheese}
  //           style={{ "--fa-primary-color": "darkred" }}
  //         />
  //       ),
  //     },
  //     {
  //       name: "Les Douceurs",
  //       slug: "douceurs",
  //       icon: (
  //         <FontAwesomeIcon
  //           size="3x"
  //           icon={faCookieBite}
  //           style={{ "--fa-primary-color": "darkred" }}
  //         />
  //       ),
  //     },
  //   ],
  // },
  {
    name: "La Cave -Cantina à Vini-",
    slug: "cave",
    icon: (
      <FontAwesomeIcon
        icon={faWineBottle}
        size="4x"
        style={{
          "--fa-primary-color": "#AF2127",
          "--fa-secondary-color": "grey",
        }}
      />
    ),
    subCategories: [
      {
        name: "Vins Rouges - Rossi",
        slug: "rouges",
        icon: (
          <FontAwesomeIcon
            size="3x"
            icon={faWineBottle}
            style={{ "--fa-primary-color": "darkred" }}
          />
        ),
      },
      {
        name: "Vins Rosés - Rosulati",
        slug: "roses",
        icon: (
          <FontAwesomeIcon
            size="3x"
            icon={faWineBottle}
            style={{ "--fa-primary-color": "#fec5d9" }}
          />
        ),
      },
      {
        name: "Vins Blancs - Bianchi",
        slug: "blancs",
        icon: (
          <FontAwesomeIcon
            size="3x"
            icon={faWineBottle}
            style={{ "--fa-primary-color": "#f1f285" }}
          />
        ),
      },
      {
        name: "Les Champagnes - Sciampagnu",
        slug: "champagnes",
        icon: (
          <FontAwesomeIcon
            size="3x"
            icon={faGlassChampagne}
            style={{ "--fa-primary-color": "white" }}
          />
        ),
      },
    ],
  },
  {
    name: "Les Bières -Bieri-",
    slug: "bieres",
    icon: (
      <FontAwesomeIcon
        size="4x"
        icon={faBeer}
        style={{
          "--fa-primary-color": "#AF2127",
          "--fa-secondary-color": "grey",
        }}
      />
    ),
  },
  {
    name: "Les Softs -Senza Alcool-",
    slug: "softs",
    icon: (
      <FontAwesomeIcon
        size="4x"
        icon={faGlassCitrus}
        style={{
          "--fa-primary-color": "#AF2127",
          "--fa-secondary-color": "grey",
        }}
      />
    ),
  },
];

export default categories;
