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
    name: "Aujourd'hui",
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
    name: "L'Épicerie",
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
        name: "Les Salés",
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
        name: "Les Petits Pots",
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
        name: "Les Huiles et Vinaigres",
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
        name: "Les Assaisonements",
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
        name: "Les Terrines",
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
        name: "Les Charcuteries",
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
        name: "Les Fromages",
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
        name: "Les Douceurs",
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
  {
    name: "Assiettes à composer",
    slug: "spuntinu",
    details: "À partir de 18h",
    icon: (
      <FontAwesomeIcon
        size="4x"
        icon={faPig}
        style={{
          "--fa-primary-color": "#AF2127",
          "--fa-secondary-color": "grey",
        }}
      />
    ),
    subCategories: [
      {
        name: "Les Salés",
        slug: "salés",
        icon: (
          <FontAwesomeIcon
            size="3x"
            icon={faFrenchFries}
            style={{ "--fa-primary-color": "darkred" }}
          />
        ),
      },
      {
        name: "Les Petits Pots",
        slug: "pots",
        icon: (
          <FontAwesomeIcon
            size="3x"
            icon={faHatChef}
            style={{ "--fa-primary-color": "darkred" }}
          />
        ),
      },
      {
        name: "Les Terrines",
        slug: "terrines",
        icon: (
          <FontAwesomeIcon
            size="3x"
            icon={faPig}
            style={{ "--fa-primary-color": "darkred" }}
          />
        ),
      },
      {
        name: "Les Charcuteries",
        slug: "charcuteries",
        icon: (
          <FontAwesomeIcon
            size="3x"
            icon={faSausage}
            style={{ "--fa-primary-color": "darkred" }}
          />
        ),
      },
      {
        name: "Les Fromages",
        slug: "fromages",
        icon: (
          <FontAwesomeIcon
            size="3x"
            icon={faCheese}
            style={{ "--fa-primary-color": "darkred" }}
          />
        ),
      },
      {
        name: "Les Douceurs",
        slug: "douceurs",
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
  {
    name: "La Cave",
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
        name: "Vins Rouges",
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
        name: "Vins Rosés",
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
        name: "Vins Blancs",
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
        name: "Les Champagnes",
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
    name: "Les Bières",
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
    name: "Les Softs",
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
