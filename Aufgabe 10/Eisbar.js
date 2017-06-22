var FormElements;
(function (FormElements) {
    window.addEventListener("load", init);
    //Array aller Eissorten
    var Eissorten = ["Erdbeereis", "Kiwieis", "Meloneneis", "Haselnusseis", "Giottoeis", "Zitroneneis", "Cookieeis", "Krokanteis", "Amarettoeis", "Straciatellaeis", "Pfirsicheis"];
    var inputsEis = [];
    //Array aller Zusaetze
    var zusaetzeauswahl = ["Sahne", "Schokososse", "Erdbeersosse", "Streusel", "Krokant"];
    var inputsZusaetze = [];
    //Array aller Darreichungsformen
    var Darreichungsform = ["Waffel", "Becher", "Box"];
    var inputsDarreichung = [];
    //HTMLElemente kreieren
    var Darreichung;
    var Eis;
    var Zusaetze;
    var Bestelluebersicht;
    var Bestellbutton;
    function init() {
        Eis = document.getElementById("Eissorten"); //auf Eisssorten im HTML zugreifen
        Eis.addEventListener("change", change);
        Zusaetze = document.getElementById("Zusaetze"); //auf Zusaetze im HTML zugreifen
        Zusaetze.addEventListener("change", change);
        Darreichung = document.getElementById("Darreichungsform"); //auf Darreichungsformen im HTML zugreifen
        Darreichung.addEventListener("change", change);
        Bestelluebersicht = document.getElementById("Bestelluebersicht"); //auf Bestelluebersicht im HTML zugreifen
        Bestellbutton = document.getElementById("BestellungAbschicken"); //auf Bestellbutton im HTML zugreifen
        Bestellbutton.addEventListener("click", BestellungPruefen);
        createEissorten();
        createZusaetze();
        createDarreichungsform();
    }
    //Input Eisssorten kreieren
    function createEissorten() {
        for (var i = 0; i < Eissorten.length; i++) {
            createInput(Eissorten[i]);
        }
    }
    function createInput(_Eissorte) {
        var label = document.createElement("label");
        var input = document.createElement("input");
        label.innerText = _Eissorte;
        label.appendChild(input);
        input.type = "number"; //Art des Inputs
        input.min = "0";
        input.max = "20";
        input.value = "0";
        label.id = _Eissorte;
        Eis.appendChild(label);
        inputsEis.push(input);
    }
    //Input Zusaetze kreieren
    function createZusaetze() {
        for (var i = 0; i < zusaetzeauswahl.length; i++) {
            createCheckbox(zusaetzeauswahl[i]);
        }
    }
    function createCheckbox(_Checkboxen) {
        var label = document.createElement("label");
        var input = document.createElement("input");
        label.innerText = _Checkboxen;
        label.appendChild(input);
        input.type = "checkbox"; //Art des Inputs
        label.id = _Checkboxen;
        Zusaetze.appendChild(label);
        inputsZusaetze.push(input);
    }
    //Input Darreichungsform kreieren
    function createDarreichungsform() {
        for (var i = 0; i < Darreichungsform.length; i++) {
            createRadio(Darreichungsform[i]);
        }
    }
    function createRadio(_Radiobutton) {
        var label = document.createElement("label");
        var input = document.createElement("input");
        label.innerText = _Radiobutton;
        label.appendChild(input);
        input.type = "radio"; //Art des Inputs
        input.name = "Radiobutton";
        label.id = _Radiobutton;
        Darreichung.appendChild(label);
        inputsDarreichung.push(input);
    }
    //Zeigt ausgew�hlte Produkte mit ihren Preisen in der Bestell�bersicht an
    function changeWarenuebersicht(_summe) {
        var BestellungUebersicht = document.getElementById("Warenuebersicht");
        BestellungUebersicht.innerText = "";
        for (var i = 0; i < inputsEis.length; i++) {
            if (parseInt(inputsEis[i].value) > 0) {
                BestellungUebersicht.innerText += Eissorten[i] + " " + (parseInt(inputsEis[i].value) * 1) + "Euro" + "\n";
            }
        }
        for (var i = 0; i < inputsZusaetze.length; i++) {
            if (inputsZusaetze[i].checked) {
                BestellungUebersicht.innerText += zusaetzeauswahl[i] + " 0.30 Euro" + "\n";
            }
        }
        for (var i = 0; i < inputsDarreichung.length; i++) {
            if (inputsDarreichung[i].checked) {
                BestellungUebersicht.innerText += Darreichungsform[i] + "\n";
            }
        }
        //Summe wird in HTML geschrieben
        var summeHtml = document.getElementById("Summe");
        summeHtml.innerText = _summe.toString() + " Euro";
    }
    function change() {
        var summe = 0;
        for (var i = 0; i < inputsEis.length; i++) {
            summe += parseInt(inputsEis[i].value); // Preis wird immer der Summer addiert oder subtrahiert, wenn die Zahl im Inputfeld ver�ndert wird
        }
        for (var i = 0; i < inputsZusaetze.length; i++) {
            if (inputsZusaetze[i].checked) {
                summe += 0.30;
            }
        }
        changeWarenuebersicht(summe);
    }
    //Bestellung wird auf Vollstaendigkeit und Richtigkeit ueberprueft
    function BestellungPruefen() {
        var Pruefung = ["Ups. Bitte ueberpruefen Sie ihre Eingaben! \n"];
        //Name
        var Name = document.getElementById("Name");
        if (Name.validity.valid == false) {
            Pruefung.push("Name \n");
            Name.style.backgroundColor = "#FFA1B0";
        }
        else {
            Name.style.backgroundColor = "white";
        }
        //Vorname
        var Vorname = document.getElementById("Vorname");
        if (Vorname.validity.valid == false) {
            Pruefung.push("Vorname \n");
            Vorname.style.backgroundColor = "#FFA1B0";
        }
        else {
            Vorname.style.backgroundColor = "white";
        }
        //Stra�e
        var Strasse = document.getElementById("Strasse");
        if (Strasse.validity.valid == false) {
            Pruefung.push("Strasse \n");
            Strasse.style.backgroundColor = "#FFA1B0";
        }
        else {
            Strasse.style.backgroundColor = "white";
        }
        //Ort, PLZ
        var OrtPLZ = document.getElementById("Ort,PLZ");
        if (OrtPLZ.validity.valid == false) {
            Pruefung.push("Ort, PLZ \n");
            OrtPLZ.style.backgroundColor = "#FFA1B0";
        }
        else {
            OrtPLZ.style.backgroundColor = "white";
        }
        //Email
        var Mail = document.getElementById("Email");
        if (Mail.validity.valid == false) {
            Pruefung.push("Email \n");
            Mail.style.backgroundColor = "#FFA1B0";
        }
        else {
            Mail.style.backgroundColor = "white";
        }
        //Eisanzahl
        var kugelanzahl = 0;
        for (var i = 0; i < inputsEis.length; i++) {
            if (parseInt(inputsEis[i].value) > 0)
                kugelanzahl += 1;
        }
        if (kugelanzahl == 0)
            Pruefung.push("Eissorten\n");
        //Zusaetze
        var Zusaetze = 0;
        for (var i = 0; i < inputsZusaetze.length; i++) {
            if (inputsZusaetze[i].checked)
                Zusaetze += 1;
        }
        if (Zusaetze == 0)
            Pruefung.push("Zusaetze\n");
        //Darreichungsform
        var Darreichung = 0;
        for (var i = 0; i < inputsDarreichung.length; i++) {
            if (inputsDarreichung[i].checked)
                Darreichung += 1;
        }
        if (Darreichung == 0)
            Pruefung.push("Darreichungsform");
        if (Pruefung.length > 0) {
            for (var i = 0; i < Pruefung.length; i++)
                Pruefung.push;
            alert(Pruefung.join(""));
        }
        else {
            alert("Danke f�r Ihre Bestellung. Besuchen Sie uns bald wieder, wir wuerden uns freuen! :)");
        }
    }
})(FormElements || (FormElements = {}));
//# sourceMappingURL=Eisbar.js.map