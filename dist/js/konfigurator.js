function konfigurator236() {
  // Najdeme sekci s filtry
  const filterSection = document.querySelector(
    ".filter-section-parametric-id-236"
  );

  if (!filterSection) {
    console.error("Element .filter-section-parametric-id-236 nebyl nalezen.");
  } else {
    console.log(".filter-section-parametric-id-236 nalezena");

    // Najdeme všechny labely s třídou filter-label
    const labels = filterSection.querySelectorAll("label.filter-label");

    if (labels.length === 0) {
      console.error("Žádné labely s třídou filter-label nebyly nalezeny.");
    } else {
      console.log(`Nalezeno ${labels.length} labelů.`);

      // Sady pro unikátní hodnoty
      const widthSet = new Set();
      const profileSet = new Set();
      const rimSet = new Set();
      const combinations = new Set();

      // Naplníme sady hodnotami z labelů
      labels.forEach((label) => {
        const value = label.textContent.trim().split(" ")[0];
        console.log(`Zpracovává se hodnota: ${value}`);
        const [width, profile, rim] = value.split("/");

        widthSet.add(width);
        profileSet.add(profile);
        rimSet.add(rim);
        combinations.add(value);
      });

      console.log("Sady hodnot naplněny");

      // Funkce pro vytvoření select elementu
      function createSelect(options, name) {
        const select = document.createElement("select");
        select.name = name;

        // Přidáme první možnost "Vybrat"
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Vybrat";
        select.appendChild(defaultOption);

        options.forEach((option) => {
          const opt = document.createElement("option");
          opt.value = option;
          opt.textContent = option;
          select.appendChild(opt);
        });

        return select;
      }

      // Vytvoříme select elementy
      const widthSelect = createSelect([...widthSet], "width");
      const profileSelect = createSelect([...profileSet], "profile");
      const rimSelect = createSelect([...rimSet], "rim");

      console.log("Select elementy vytvořeny");

      // Vytvoříme kontejner pro selecty a přidáme je
      const selectContainer = document.createElement("div");
      selectContainer.classList.add("select-container");
      selectContainer.appendChild(widthSelect);
      selectContainer.appendChild(profileSelect);
      selectContainer.appendChild(rimSelect);

      // Připojíme kontejner na konec filterSection
      filterSection.appendChild(selectContainer);
      console.log("Select elementy přidány do DOM");

      // Vytvoření tlačítka
      const button = document.createElement("button");
      button.textContent = "Potvrdit";
      button.disabled = true; // Tlačítko je na začátku zakázané
      filterSection.appendChild(button);

      // Funkce pro validaci kombinace
      function validateCombination() {
        const selectedWidth = widthSelect.value;
        const selectedProfile = profileSelect.value;
        const selectedRim = rimSelect.value;

        // Zkontrolujeme, zda jsou všechny selekty vybrány
        if (!selectedWidth) {
          console.log("Vyberte šířku.");
          button.disabled = true; // Zakázat tlačítko
          return;
        }

        // Na základě výběru ve widthSelect deaktivujeme neplatné profileSelect a rimSelect možnosti
        updateDisabledOptions();

        if (!selectedProfile) {
          console.log("Vyberte profil.");
          button.disabled = true; // Zakázat tlačítko
          return;
        }

        // Na základě výběru v profileSelect deaktivujeme neplatné rimSelect možnosti
        updateRimOptions(selectedWidth, selectedProfile);

        if (!selectedRim) {
          console.log("Vyberte ráfek.");
          button.disabled = true; // Zakázat tlačítko
          return;
        }

        const selectedCombination = `${selectedWidth}/${selectedProfile}/${selectedRim}`;
        console.log(`Vybraná kombinace: ${selectedCombination}`);

        // Zkontrolujeme, zda je vybraná kombinace platná
        if (!combinations.has(selectedCombination)) {
          console.log("Neplatná kombinace");
          button.disabled = true; // Zakázat tlačítko
        } else {
          console.log("Platná kombinace");
          button.disabled = false; // Povolit tlačítko
        }
      }

      // Funkce pro aktualizaci disabled možností pro profileSelect a rimSelect
      function updateDisabledOptions() {
        const selectedWidth = widthSelect.value;

        // Pro všechny možnosti profileSelect nastavíme disabled, pokud kombinace s tímto selectedWidth neexistuje
        [...profileSelect.options].forEach((option) => {
          const profileValue = option.value;
          const combination = `${selectedWidth}/${profileValue}/`;
          option.disabled = ![...rimSet].some((rim) =>
            combinations.has(combination + rim)
          );
        });

        // Povolit profileSelect, pokud byl dříve deaktivován
        profileSelect.disabled = !selectedWidth;

        // Po výběru šířky (width) povolíme profileSelect
        profileSelect.disabled = !selectedWidth;

        // Pokud je druhý select vybrán a je neplatný, nastavíme ho zpět na výchozí "Vybrat"
        if (profileSelect.value && profileSelect.selectedOptions[0].disabled) {
          profileSelect.value = ""; // Změníme na výchozí "Vybrat"
          console.log(
            'Neplatná možnost v profileSelect, nastaveno zpět na "Vybrat"'
          );
        }
      }

      // Funkce pro aktualizaci rimSelect na základě selectedWidth a selectedProfile
      function updateRimOptions(selectedWidth, selectedProfile) {
        [...rimSelect.options].forEach((option) => {
          const rimValue = option.value;
          const combination = `${selectedWidth}/${selectedProfile}/${rimValue}`;
          option.disabled = !combinations.has(combination);
        });

        // Povolit rimSelect, pokud byl dříve deaktivován
        rimSelect.disabled = !(selectedWidth && selectedProfile);

        // Pokud je třetí select vybrán a je neplatný, nastavíme ho zpět na výchozí "Vybrat"
        if (rimSelect.value && rimSelect.selectedOptions[0].disabled) {
          rimSelect.value = ""; // Změníme na výchozí "Vybrat"
          console.log(
            'Neplatná možnost v rimSelect, nastaveno zpět na "Vybrat"'
          );
        }
      }

      // Funkce pro úpravu URL podle vybraných možností
      function updateURL() {
        const selectedWidth = widthSelect.value;
        const selectedProfile = profileSelect.value;
        const selectedRim = rimSelect.value;

        // Pokud jsou všechny selekty vybrány, upravíme URL
        if (selectedWidth && selectedProfile && selectedRim) {
          const selectedCombination = `${selectedWidth}/${selectedProfile}/${selectedRim}`;
          console.log(`Hledám input s value: ${selectedCombination}`);

          // Najdeme input s odpovídajícím value
          const inputToCheck = filterSection.querySelector(
            `input[value="${selectedCombination}"]`
          );
          if (inputToCheck) {
            const inputId = inputToCheck.id.replace(/[^\d]/g, ""); // Extrahujeme číslo z ID (např. 1553)

            // Získáme aktuální URL
            let currentURL = window.location.href;

      // Odstraníme předchozí výběr (pokud existuje)
      const regex = /[?&]pv236=[^&]+/;
      currentURL = currentURL.replace(regex, '');

      // Pokud URL obsahuje nějaké parametry, přidáme nový parametr na začátek
      if (currentURL.includes('?')) {
        // Pokud je v URL už nějaký parametr, přidáme &pv236=...
        currentURL = currentURL.replace('?', `?pv236=${inputId}&`);
      } else {
        // Pokud v URL žádný parametr není, použijeme ?pv236=...
        currentURL = `${currentURL}?pv236=${inputId}`;
      }
  // Změníme URL bez reloadu stránky
  window.history.pushState({ path: currentURL }, '', currentURL);

  console.log(`Nová URL: ${currentURL}`);

            // Načteme stránku znovu s novou URL
            window.location.reload();

          } else {
            console.log(`Input s value ${selectedCombination} nebyl nalezen.`);
          }
        }
      }

      // Přidáme event listener na změnu v selectech
      widthSelect.addEventListener("change", validateCombination);
      profileSelect.addEventListener("change", validateCombination);
      rimSelect.addEventListener("change", validateCombination);

      // Přidáme event listener na kliknutí na tlačítko pro úpravu URL
      button.addEventListener("click", updateURL);
    }
  }
}

konfigurator236();

/* call functions after order modal loaded */
document.addEventListener(
  "ShoptetDOMPageContentLoaded",
  function () {
    konfigurator236();
  },
  {
    passive: true,
  }
);
