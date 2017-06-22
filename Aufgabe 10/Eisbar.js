var FormElements;
(function (FormElements) {
    window.addEventListener("load", init);
    //Array aller Eissorten
    var eissorten = ["Erdbeereis", "Kiwieis", "Meloneneis", "Haselnusseis", "Giottoeis", "Zitroneneis", "Cookieeis", "Krokanteis", "Amarettoeis", "Straciatellaeis", "Pfirsicheis"];
    var inputsEis = [];
    //Array aller Zusaetze
    var zusaetzeauswahl = ["Sahne", "Schokososse", "Erdbeersosse", "Streusel", "Krokant"];
    var inputsZusaetze = [];
    //Array aller Darreichungsformen
    var darreichungsform = ["Waffel", "Becher", "Box"];
    var inputsDarreichung = [];
    //HTMLElemente kreieren
    var darreichung;
    var eis;
    var zusaetze;
    var bestelluebersicht;
    var bestellbutton;
    function init() {
        eis = document.getElementById("Eissorten"); //auf Eisssorten im HTML zugreifen
        eis.addEventListener("change", change);
        zusaetze = document.getElementById("Zusaetze"); //auf Zusaetze im HTML zugreifen
        zusaetze.addEventListener("change", change);
        darreichung = document.getElementById("Darreichungsform"); //auf Darreichungsformen im HTML zugreifen
        darreichung.addEventListener("change", change);
        bestelluebersicht = document.getElementById("Bestelluebersicht"); //auf Bestelluebersicht im HTML zugreifen
        bestellbutton = document.getElementById("BestellungAbschicken"); //auf Bestellbutton im HTML zugreifen
        bestellbutton.addEventListener("click", BestellungPruefen);
        createEissorten();
        createZusaetze();
        createDarreichungsform();
    }
    //Input Eisssorten kreieren
    function createEissorten() {
        for (var i = 0; i < eissorten.length; i++) {
            createInput(eissorten[i]);
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
        input.name = _Eissorte;
        label.id = _Eissorte;
        eis.appendChild(label);
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
        input.name = _Checkboxen;
        label.id = _Checkboxen;
        zusaetze.appendChild(label);
        inputsZusaetze.push(input);
    }
    //Input Darreichungsform kreieren
    function createDarreichungsform() {
        for (var i = 0; i < darreichungsform.length; i++) {
            createRadio(darreichungsform[i]);
        }
    }
    function createRadio(_Radiobutton) {
        var label = document.createElement("label");
        var input = document.createElement("input");
        label.innerText = _Radiobutton;
        label.appendChild(input);
        input.type = "radio"; //Art des Inputs
        input.name = "Darreichungsform";
        label.id = _Radiobutton;
        darreichung.appendChild(label);
        inputsDarreichung.push(input);
    }
    //Zeigt ausgew�hlte Produkte mit ihren Preisen in der Bestell�bersicht an
    function changeWarenuebersicht(_summe) {
        var bestellungUebersicht = document.getElementById("Warenuebersicht");
        bestellungUebersicht.innerText = "";
        for (var i = 0; i < inputsEis.length; i++) {
            if (parseInt(inputsEis[i].value) > 0) {
                bestellungUebersicht.innerText += eissorten[i] + " " + (parseInt(inputsEis[i].value) * 1) + "Euro" + "\n";
            }
        }
        for (var i = 0; i < inputsZusaetze.length; i++) {
            if (inputsZusaetze[i].checked) {
                bestellungUebersicht.innerText += zusaetzeauswahl[i] + " 0.30 Euro" + "\n";
            }
        }
        for (var i = 0; i < inputsDarreichung.length; i++) {
            if (inputsDarreichung[i].checked) {
                bestellungUebersicht.innerText += darreichungsform[i] + "\n";
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
        var pruefung = ["Ups. Bitte ueberpruefen Sie ihre Eingaben! \n"];
        //Name
        var name = document.getElementById("Name");
        if (name.validity.valid == false) {
            pruefung.push("Name \n");
            name.style.backgroundColor = "#FFA1B0";
        }
        else {
            name.style.backgroundColor = "white";
        }
        //Vorname
        var vorname = document.getElementById("Vorname");
        if (vorname.validity.valid == false) {
            pruefung.push("Vorname \n");
            vorname.style.backgroundColor = "#FFA1B0";
        }
        else {
            vorname.style.backgroundColor = "white";
        }
        //Stra�e
        var strasse = document.getElementById("Strasse");
        if (strasse.validity.valid == false) {
            pruefung.push("Strasse \n");
            strasse.style.backgroundColor = "#FFA1B0";
        }
        else {
            strasse.style.backgroundColor = "white";
        }
        //Ort, PLZ
        var ortPLZ = document.getElementById("Ort,PLZ");
        if (ortPLZ.validity.valid == false) {
            pruefung.push("Ort, PLZ \n");
            ortPLZ.style.backgroundColor = "#FFA1B0";
        }
        else {
            ortPLZ.style.backgroundColor = "white";
        }
        //Email
        var mail = document.getElementById("Email");
        if (mail.validity.valid == false) {
            pruefung.push("Email \n");
            mail.style.backgroundColor = "#FFA1B0";
        }
        else {
            mail.style.backgroundColor = "white";
        }
        //Eisanzahl
        var kugelanzahl = 0;
        for (var i = 0; i < inputsEis.length; i++) {
            if (parseInt(inputsEis[i].value) > 0)
                kugelanzahl += 1;
        }
        if (kugelanzahl == 0)
            pruefung.push("Eissorten\n");
        //Zusaetze
        var zusaetze = 0;
        for (var i = 0; i < inputsZusaetze.length; i++) {
            if (inputsZusaetze[i].checked)
                zusaetze += 1;
        }
        if (zusaetze == 0)
            pruefung.push("Zusaetze\n");
        //Darreichungsform
        var darreichung = 0;
        for (var i = 0; i < inputsDarreichung.length; i++) {
            if (inputsDarreichung[i].checked)
                darreichung += 1;
        }
        if (darreichung == 0)
            pruefung.push("Darreichungsform");
        if (pruefung.length > 1) {
            alert(pruefung.join(""));
        }
        else {
            alert("Danke f�r Ihre Bestellung. Besuchen Sie uns bald wieder, wir wuerden uns freuen! :)");
            document.getElementById("iceform").submit();
        }
    }
})(FormElements || (FormElements = {}));
//# sourceMappingURL=Eisbar.js.map