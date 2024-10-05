class Vet {
  constructor({
    id,
    name,
    socialNetworks,
    email,
    phone,
    businessHours,
    address,
    geoLocation,
  }) {
    this.id = id;
    this.name = name;
    this.socialNetworks = socialNetworks;
    this.email = email;
    this.phone = phone;
    this.businessHours = businessHours;
    this.address = address;
    this.geoLocation = geoLocation;
  }

  isOpenToday(day) {
    return this.businessHours[day.toLowerCase()] || "Closed";
  }

  getLocation() {
    return this.geoLocation;
  }
}

export default Vet;
