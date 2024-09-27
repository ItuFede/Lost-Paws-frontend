class Pet {
  constructor({
    id,
    description,
    isLost,
    missingReport,
    ownerId,
    phoneNumberOwner,
    emailOwner,
    name,
    animal,
    town,
  }) {
    this.id = id;
    this.description = description;
    this.isLost = isLost === "TRUE";
    this.missingReport = missingReport;
    this.ownerId = ownerId;
    this.phoneNumberOwner = phoneNumberOwner;
    this.emailOwner = emailOwner;
    this.name = name;
    this.animal = animal;
    this.town = town;
  }

  getLatitude(pos) {
    console.log("getLatitude:::", this.missingReport);
    return this.missingReport.locationsView[pos].latitude;
  }

  getLongitude(pos) {
    return this.missingReport.locationsView[pos].longitude;
  }

  hasLocations() {
    return this.missingReport.locationsView.length > 0;
  }

  getLocations() {
    return this.missingReport.locationsView;
  }

  getFirstLostLocation() {
    return [this.getLatitude(0), this.getLongitude(0)];
  }

  getPositionPos(index) {
    return this.missingReport.locationsView[index].timestamp;
  }

  getMissingState() {
    return this.missingReport.state;
  }

  getAnimalType() {
    return this.animal == "CAT" ? "GATO" : "PERRO";
  }
}

export default Pet;
