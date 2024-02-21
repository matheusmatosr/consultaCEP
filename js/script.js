$(document).ready(function () {
  $("#cep-input").mask("00000-000");

  const inputCep = $("#cep-input");
  const searchBtn = $("#search");
  const infoMessage = $("#info-message");

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

    const apiURL = `https://viacep.com.br/ws/${cep}/json/`;

    try {
      const res = await fetch(apiURL);
      const data = await res.json();

      toggleLoader();

      return data;
    } catch (error) {
      console.error("Error fetching CEP data:", error);
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

      console.log("API response:", data);

      if (!data.erro) {
        stateElement.text(data.uf);
        cityElement.text(data.localidade);
        addressElement.text(data.logradouro);
        districtElement.text(data.bairro);

        cepContainer.removeClass("hide");
        cepContainer.addClass("show");

        // Hide info-message
        infoMessage.addClass("hide");
      } else {
        showErrorMessage();
      }
    } catch (error) {
      console.error("Error in showCepData:", error);
      showErrorMessage();
    }
  };

  searchBtn.on("click", async (e) => {
    e.preventDefault();

    const cep = inputCep.val();

    console.log("CEP entered:", cep);

    showCepData(cep);

    infoMessage.addClass("hide");
  });

  infoMessage.removeClass("hide");
});
