$(document).ready(function () {
  $("#cep-input").mask("00000-000");

  const inputCep = $("#cep-input");
  const searchBtn = $("#search");
  const infoMessage = $("#info-message"); // Added this line

  const cityElement = $("#city");
  const stateElement = $("#state");
  const districtElement = $("#district");
  const addressElement = $("#address");

  const cepContainer = $("#cep-data");

  const errorMessageContainer = $("#error-message");
  const loader = $("#loader");

  // Loader
  const toggleLoader = () => {
    loader.toggleClass("hide");
  };

  const getCepData = async (cep) => {
    toggleLoader();

    const apiURL = `https://cdn.apicep.com/file/apicep/${cep}.json`;

    try {
      const res = await fetch(apiURL);
      const data = await res.json();

      toggleLoader();

      return data;
    } catch (error) {
      console.error("Erro ao buscar dados do CEP:", error);
      toggleLoader();
      throw error;
    }
  };

  // Tratamento de erro
  const showErrorMessage = () => {
    errorMessageContainer.removeClass("hide");
  };

  const hideInformation = () => {
    errorMessageContainer.addClass("hide");
    cepContainer.addClass("hide");
  };

  const showCepData = async (cep) => {
    hideInformation();

    try {
      const data = await getCepData(cep);

      if (data.status === 200) {
        stateElement.text(data.state);
        cityElement.text(data.city);
        addressElement.text(data.address);
        districtElement.text(data.district);

        cepContainer.removeClass("hide");
        cepContainer.addClass("show");
        
        // Hide info-message
        infoMessage.addClass("hide");
      } else {
        showErrorMessage();
      }
    } catch (error) {
      showErrorMessage();
    }
  };

  searchBtn.on("click", async (e) => {
    e.preventDefault();

    const cep = inputCep.val();

    showCepData(cep);
    
    infoMessage.addClass("hide");
  });

  infoMessage.removeClass("hide");
});
