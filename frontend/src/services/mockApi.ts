// Mock de la función que simula la llamada a la API
export const mockApiCall = async (imageUrl: string): Promise<any> => {
  // Simulamos un retardo de 1 segundo para simular la llamada a la API
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Devolvemos la respuesta mockeada
  return [
    {
      id: "367022517",
      name: "GEOMETRIC JACQUARD SHIRT",
      price: {
        currency: "EUR",
        value: {
          current: 29.95
        }
      },
      link: "https://www.zara.com/es/en/geometric-jacquard-shirt-p01618475.html?v1=367022517",
      brand: "zara"
    },
    {
      id: "367196402",
      name: "METALLIC THREAD RUSTIC SHIRT",
      price: {
        currency: "EUR",
        value: {
          current: 15.99,
          original: 27.95
        }
      },
      link: "https://www.zara.com/es/en/metallic-thread-rustic-shirt-p02298151.html?v1=367196402",
      brand: "zara"
    },
    {
      id: "367022517",
      name: "GEOMETRIC JACQUARD SHIRT",
      price: {
        currency: "EUR",
        value: {
          current: 29.95
        }
      },
      link: "https://www.zara.com/es/en/geometric-jacquard-shirt-p01618475.html?v1=367022517",
      brand: "zara"
    },
    {
      id: "367196402",
      name: "METALLIC THREAD RUSTIC SHIRT",
      price: {
        currency: "EUR",
        value: {
          current: 15.99,
          original: 27.95
        }
      },
      link: "https://www.zara.com/es/en/metallic-thread-rustic-shirt-p02298151.html?v1=367196402",
      brand: "zara"
    },
    {
      id: "367022517",
      name: "GEOMETRIC JACQUARD SHIRT",
      price: {
        currency: "EUR",
        value: {
          current: 29.95
        }
      },
      link: "https://www.zara.com/es/en/geometric-jacquard-shirt-p01618475.html?v1=367022517",
      brand: "zara"
    },
    {
      id: "367196402",
      name: "METALLIC THREAD RUSTIC SHIRT",
      price: {
        currency: "EUR",
        value: {
          current: 15.99,
          original: 27.95
        }
      },
      link: "https://www.zara.com/es/en/metallic-thread-rustic-shirt-p02298151.html?v1=367196402",
      brand: "zara"
    },
    {
      id: "367022517",
      name: "GEOMETRIC JACQUARD SHIRT",
      price: {
        currency: "EUR",
        value: {
          current: 29.95
        }
      },
      link: "https://www.zara.com/es/en/geometric-jacquard-shirt-p01618475.html?v1=367022517",
      brand: "zara"
    },
    {
      id: "367196402",
      name: "METALLIC THREAD RUSTIC SHIRT",
      price: {
        currency: "EUR",
        value: {
          current: 15.99,
          original: 27.95
        }
      },
      link: "https://www.zara.com/es/en/metallic-thread-rustic-shirt-p02298151.html?v1=367196402",
      brand: "zara"
    },
    {
      id: "367022517",
      name: "GEOMETRIC JACQUARD SHIRT",
      price: {
        currency: "EUR",
        value: {
          current: 29.95
        }
      },
      link: "https://www.zara.com/es/en/geometric-jacquard-shirt-p01618475.html?v1=367022517",
      brand: "zara"
    },
    {
      id: "367196402",
      name: "METALLIC THREAD RUSTIC SHIRT",
      price: {
        currency: "EUR",
        value: {
          current: 15.99,
          original: 27.95
        }
      },
      link: "https://www.zara.com/es/en/metallic-thread-rustic-shirt-p02298151.html?v1=367196402",
      brand: "zara"
    },
    {
      id: "367022517",
      name: "GEOMETRIC JACQUARD SHIRT",
      price: {
        currency: "EUR",
        value: {
          current: 29.95
        }
      },
      link: "https://www.zara.com/es/en/geometric-jacquard-shirt-p01618475.html?v1=367022517",
      brand: "zara"
    },
    {
      id: "367196402",
      name: "METALLIC THREAD RUSTIC SHIRT",
      price: {
        currency: "EUR",
        value: {
          current: 15.99,
          original: 27.95
        }
      },
      link: "https://www.zara.com/es/en/metallic-thread-rustic-shirt-p02298151.html?v1=367196402",
      brand: "zara"
    },
    {
      id: "367022517",
      name: "GEOMETRIC JACQUARD SHIRT",
      price: {
        currency: "EUR",
        value: {
          current: 29.95
        }
      },
      link: "https://www.zara.com/es/en/geometric-jacquard-shirt-p01618475.html?v1=367022517",
      brand: "zara"
    },
    {
      id: "367196402",
      name: "METALLIC THREAD RUSTIC SHIRT",
      price: {
        currency: "EUR",
        value: {
          current: 15.99,
          original: 27.95
        }
      },
      link: "https://www.zara.com/es/en/metallic-thread-rustic-shirt-p02298151.html?v1=367196402",
      brand: "zara"
    },
    {
      id: "367022517",
      name: "GEOMETRIC JACQUARD SHIRT",
      price: {
        currency: "EUR",
        value: {
          current: 29.95
        }
      },
      link: "https://www.zara.com/es/en/geometric-jacquard-shirt-p01618475.html?v1=367022517",
      brand: "zara"
    },
    {
      id: "367196402",
      name: "METALLIC THREAD RUSTIC SHIRT",
      price: {
        currency: "EUR",
        value: {
          current: 15.99,
          original: 27.95
        }
      },
      link: "https://www.zara.com/es/en/metallic-thread-rustic-shirt-p02298151.html?v1=367196402",
      brand: "zara"
    },
  ];
};

// Mock de la función que simula la llamada a la API de búsqueda por texto
export const mockTextSearchApiCall = async (query: string, brand: string = "zara"): Promise<any> => {
  // Simulamos un retardo de 1 segundo para simular la llamada a la API
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Devolvemos la respuesta mockeada
  return [
    {
      id: "367022517",
      name: "GEOMETRIC JACQUARD SHIRT",
      price: {
        currency: "EUR",
        value: {
          current: 29.95
        }
      },
      link: "https://www.zara.com/es/en/geometric-jacquard-shirt-p01618475.html?v1=367022517",
      brand: "zara"
    },
    {
      id: "367196402",
      name: "METALLIC THREAD RUSTIC SHIRT",
      price: {
        currency: "EUR",
        value: {
          current: 15.99,
          original: 27.95
        }
      },
      link: "https://www.zara.com/es/en/metallic-thread-rustic-shirt-p02298151.html?v1=367196402",
      brand: "zara"
    }
  ];
};