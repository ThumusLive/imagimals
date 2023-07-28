/* eslint-disable max-len */
export const data = {
  cat: {
    names: {
      fr: "chat",
      "es-ES": "gato",
    },
    url: "https://api.thecatapi.com/v1/images/search?limit=10",
  },
  dog: {
    names: {
      fr: "chien",
      "es-ES": "perro",
    },
    url: "https://api.thedogapi.com/v1/images/search?limit=10",
  },
  quokka: {
    names: {},
    url: "https://quokka.pics/api/",
  },
  shiba: {
    names: {},
    url: "http://shibe.online/api/shibes?count=100&httpsUrls=true",
  },
  fox: {
    names: {
      fr: "renard",
      "es-ES": "zorro",
    },
    alias: ["renard", "zorro"],
    url: "https://randomfox.ca/floof/",
  },
};

export const getAliases = () => Object.fromEntries(Object.entries(data).map((a) => [a[0], { alias: Object.values(a[1].names), url: a[1].url }]));
