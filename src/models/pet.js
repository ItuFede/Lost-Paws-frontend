class Pet {
  constructor({
    id,
    description,
    isLost,
    missingReports,
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
    this.missingReports = missingReports.map((report) => ({
      ...report,
      locationsView: report.locationsView.map((location) => ({
        Latitud: location.Latitud,
        Longitud: location.Longitud,
        Timestamp: new Date(location.Timestamp * 1000),
      })),
    }));
    this.ownerId = ownerId;
    this.phoneNumberOwner = phoneNumberOwner;
    this.emailOwner = emailOwner;
    this.name = name;
    this.animal = animal;
    this.town = town;
  }

  getLatitude() {
    return this.missingReports[0].locationsView[0].Latitud;
  }

  getLongitud() {
    return this.missingReports[0].locationsView[0].Longitud;
  }

  hasLocations() {
    return this.missingReports[0].locationsView.length > 0;
  }

  getLocations() {
    return this.missingReports[0].locationsView;
  }

  getMissingState() {
    return this.missingReports[0].state;
  }
}

export default Pet;
