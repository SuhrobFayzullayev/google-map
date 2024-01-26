const zoomInBtn = document.getElementById("zoomIn");
const zoomOutBtn = document.getElementById("zoomOut");

async function initMap() {
  // Request needed libraries.
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker"
  );
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: { lat: 41.311081, lng: 64.5 },
    disableDefaultUI: true,
  });

  let markers2 = new google.maps.Marker({
    map: map,
  });

  let InfoWindow2 = new google.maps.InfoWindow({
    content: "",
  });

  const infoWindow = new google.maps.InfoWindow({
    content: "",
    boxStyle: {
      width: "280px",
    },
    closeBoxMargin: "20px 30px",
  });

  map.addListener("click", (mapsMouseEvent) => {
    markers2.setPosition(mapsMouseEvent.latLng);
    InfoWindow2.setContent(
      `<p> <bold>Lat: </bold> ${mapsMouseEvent.latLng.lat()}</p> <p> <bold>Lng: </bold> ${mapsMouseEvent.latLng.lng()}</p>`
    );
    InfoWindow2.open(map, markers2);
  });

  // Create an array of alphabetical characters used to label the markers.
  // Add some markers to the map.
  const markers = locations.map((position, i) => {
    var marker = new google.maps.Marker({
      position,
      map: map,
      icon: {
        url: "./location.svg",
        scaledSize: { height: 45, width: 45 },
      },
    });

    // markers can only be keyboard focusable when they have click listeners
    // open info window when marker is clicked
    marker.addListener("click", () => {
      const langList = ["/ru/", "/uz/", "/en/"];
      const pathname = window.location.pathname;

      if (pathname.includes(langList[0])) {
        infoWindow.setContent(`<div style='width: 300px' id='locationInfoModal' class='contact-page__list-col'>
        <h3 class="card-title">${position.title_ru}</h3>
  
        <p>
            <span>ФИО:</span>
            ${position.name_ru}
        </p>
        <p>
            <span>Адрес:</span>
            ${position.address_ru}
        </p>
        <p>
            <span>Номер телефона:</span>
            ${position.phone}
        </p>
        <p>
            <span>Рабочие дни:</span>
            ${position.work_days_ru}
        </p>
        <p>
            <span>Рабочие часы:</span>
            ${position.opening_hours_ru}
        </p>
  
        <p>
            <span>Обеденный перерыв:</span>
            ${position.lunch_ru}
        </p>
    </div>`);
      } else if (pathname.includes(langList[1])) {
        infoWindow.setContent(`<div style='width: 300px' id='locationInfoModal' class='contact-page__list-col'>
        <h3 class="card-title">${position.title_uz}</h3>
  
        <p>
            <span>FIO:</span>
            ${position.name_uz}
        </p>
        <p>
            <span>Manzil:</span>
            ${position.address_uz}
        </p>
        <p>
            <span>Telefon raqam:</span>
            ${position.phone}
        </p>
        <p>
            <span>Ish kuni:</span>
            ${position.work_days_uz}
        </p>
        <p>
            <span>Ish soati:</span>
            ${position.opening_hours_uz}
        </p>
  
        <p>
            <span>Tushlik vaqti:</span>
            ${position.lunch_uz}
        </p>
    </div>`);
      } else {
        infoWindow.setContent(`<div style='width: 300px' id='locationInfoModal' class='contact-page__list-col'>
        <h3 class="card-title">${position.title_en}</h3>
  
        <p>
            <span>Full name:</span>
            ${position.name_en}
        </p>
        <p>
            <span>Address:</span>
            ${position.address_en}
        </p>
        <p>
            <span>Phone number:</span>
            ${position.phone}
        </p>
        <p>
            <span>Working days:</span>
            ${position.work_days_en}
        </p>
        <p>
            <span>Working hours:</span>
            ${position.opening_hours_en}
        </p>
  
        <p>
            <span>Lunch time:</span>
            ${position.lunch_en}
        </p>
    </div>`);
      }

      infoWindow.open(map, marker);
    });
    return marker;
  });

  new markerClusterer.MarkerClusterer({
    markers,
    map,
    renderer: {
      render: ({ markers, _position: position }) => {
        return new google.maps.Marker({
          position: {
            lat: position.lat(),
            lng: position.lng(),
          },
          label: {
            text: String(markers.length),
            color: "white",
          },
          icon: {
            url: "./circle.svg",
            scaledSize: { height: 30, width: 30 },
          },
        });
      },
    },
    // onClusterClick: (event, cluster, map) => {
    //   map.fitBounds(cluster.bounds, { zoom: 10 });
    // },
  });

  google.maps.event.addDomListener(zoomInBtn, "click", function () {
    map.setZoom(map.getZoom() + 1);
  });

  google.maps.event.addDomListener(zoomOutBtn, "click", function () {
    if (map.getZoom() > 6) map.setZoom(map.getZoom() - 1);
  });

  const regions = document.querySelectorAll(".map-links");

  const regionData = [
    { lat: 43.5, lng: 59, zoom: 7.5 },
    { lat: 41.31, lng: 69.25, zoom: 12 },
    { lat: 40.7720554, lng: 72.3062532, zoom: 12 },
    { lat: 39.77472, lng: 64.42861, zoom: 12 },
    { lat: 40.11583, lng: 67.84222, zoom: 12.5 },
    { lat: 38.58333, lng: 66 },
    { lat: 42, lng: 64 },
    { lat: 40.99747, lng: 71.24784 },
    { lat: 39.8, lng: 66.43333 },
    { lat: 37.49472, lng: 67.39333 },
    { lat: 40.43333, lng: 68.66667 },
    { lat: 41.254142241, lng: 69.813382217 },
    { lat: 40.5, lng: 71.25 },
    { lat: 41.5, lng: 60.5 },
  ];

  regions.forEach((element, i) => {
    element.addEventListener("click", () => {
      regions.forEach((el, i) => el.classList.remove("active"));
      element.classList.add("active");
      map.setCenter(regionData[i]);
      map.setZoom(regionData[i].zoom ? regionData[i].zoom : 10);
    });
  });
}

const locations = [
  {
    lat: 41.311081,
    lng: 64.5,
    region: "tashkent",
    title_en: "tile en",
    title_ru: "tile ru",
    title_uz: "tile uz",
    address_ru: "address_ru",
    address_en: "address_en",
    address_uz: "address_uz",
    phone: "99 999 99 99",
    work_days_ru: "work_days_ru",
    work_days_en: "work_days_en",
    work_days_uz: "work_days_uz",
    opening_hours_en: "opening_hours_en",
    opening_hours_uz: "opening_hours_uz",
    opening_hours_ru: "opening_hours_ru",
    name_en: "name_en",
    name_ru: "name_ru",
    name_uz: "name_uz",
    lunch_ru: "lunch_ru",
    lunch_en: "lunch_en",
    lunch_uz: "lunch_uz",
  },
];

async function fetchLocations() {
  // const response = fetch('url')
}

await fetchLocations();

await initMap();
