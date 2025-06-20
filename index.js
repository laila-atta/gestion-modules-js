let modules = [];
let indexEnCours = -1;

function ajouterModule() {
  const nom = document.getElementById("moduleName").value;
  const cc1 = parseFloat(document.getElementById("cc1").value);
  const cc2 = parseFloat(document.getElementById("cc2").value);
  const cc3 = parseFloat(document.getElementById("cc3").value);
  const cc4 = parseFloat(document.getElementById("cc4").value);
  const efm = parseFloat(document.getElementById("efm").value); // sur 40 
  const coef = parseFloat(document.getElementById("coef").value);

  if (!nom || isNaN(cc1) || isNaN(cc2) || isNaN(cc3) || isNaN(cc4) || isNaN(efm) || isNaN(coef)) {
    alert("Merci de remplir tous les champs correctement.");
    return;
  }

  const efmSur20 = (efm / 40) * 20;
  const moyenne = (cc1 * 0.0825 + cc2 * 0.0825 + cc3 * 0.0825 + cc4 * 0.0825 + efmSur20 * 0.67);

  const module = {
    nom,
    cc1,
    cc2,
    cc3,
    cc4,
    efm,
    coef,
    moyenne
  };

  modules.push(module);
  afficherModules();
  viderFormulaire();
}

function afficherModules() {
  const tbody = document.getElementById("modulesTable");
  tbody.innerHTML = "";

  modules.forEach((module, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${module.nom}</td>
      <td>${module.cc1}</td>
      <td>${module.cc2}</td>
      <td>${module.cc3}</td>
      <td>${module.cc4}</td>
      <td>${module.efm}</td>
      <td>${module.coef}</td>
      <td>${module.moyenne.toFixed(2)}</td>
      <td class="actions">
        <button onclick="chargerModule(${index})">Modifier</button>
        <button onclick="supprimerModule(${index})">Supprimer</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function viderFormulaire() {
  document.getElementById("moduleName").value = "";
  document.getElementById("cc1").value = "";
  document.getElementById("cc2").value = "";
  document.getElementById("cc3").value = "";
  document.getElementById("cc4").value = "";
  document.getElementById("efm").value = "";
  document.getElementById("coef").value = "";
  indexEnCours = -1;
  document.getElementById("modifierBtn").style.display = "none";
}

function chargerModule(index) {
  const module = modules[index];
  document.getElementById("moduleName").value = module.nom;
  document.getElementById("cc1").value = module.cc1;
  document.getElementById("cc2").value = module.cc2;
  document.getElementById("cc3").value = module.cc3;
  document.getElementById("cc4").value = module.cc4;
  document.getElementById("efm").value = module.efm;
  document.getElementById("coef").value = module.coef;
  indexEnCours = index;
  document.getElementById("modifierBtn").style.display = "inline-block";
}

function modifierModule() {
  if (indexEnCours === -1) return;

  const nom = document.getElementById("moduleName").value;
  const cc1 = parseFloat(document.getElementById("cc1").value);
  const cc2 = parseFloat(document.getElementById("cc2").value);
  const cc3 = parseFloat(document.getElementById("cc3").value);
  const cc4 = parseFloat(document.getElementById("cc4").value);
  const efm = parseFloat(document.getElementById("efm").value); 
  const coef = parseFloat(document.getElementById("coef").value);

  const efmSur20 = (efm / 40) * 20; 
  const moyenne = (cc1 * 0.0825 + cc2 * 0.0825 + cc3 * 0.0825 + cc4 * 0.0825 + efmSur20 * 0.67);

  modules[indexEnCours] = { 
    nom,
    cc1,
    cc2,
    cc3,
    cc4,
    efm,
    coef,
    moyenne
  };

  afficherModules();
  viderFormulaire();
}

function calculerMoyenne() {
  if (modules.length === 0) {
    document.getElementById("result").textContent = "Aucun module saisi.";
    return;
  }

  let total = 0,
      totalCoef = 0;

  modules.forEach(module => {
    total += module.moyenne * module.coef;
    totalCoef += module.coef;
  });

  const moyenneAnnuelle = total / totalCoef;
  document.getElementById("result").textContent = ` Moyenne Annuelle : ${moyenneAnnuelle.toFixed(2)} / 20`;
}

function supprimerModule(index) {
  modules.splice(index, 1); 
  afficherModules(); 
}

