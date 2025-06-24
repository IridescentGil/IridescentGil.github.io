const INFINITY_LOGO_LINK_ADRESS_MAP = new Map([
    ['it-demand-and-service-management', 'https://www.google.com'],
    ['system-and-process-assurance', 'https://www.google.com'],
    ['financial-services-and-payment-processing', 'https://www.google.com'],
    ['human-capital-management', 'https://www.google.com'],
    ['data-analytics-and-reporting', 'https://www.google.com'],
    ['digital-tranformation-and-enablement', 'https://www.google.com'],
    ['consumer-and-enterprise-vetting', 'https://www.google.com'],
    ['contact-centre', 'https://www.google.com'],
    ['consumer-enterprise-and-collections', 'https://www.google.com'],
    ['billing-management', 'https://www.google.com'],
],
);
// Apply tranform scale to height and with to
// allow the removal of tranform attribute for consistent placement
const INFORMATION_BOX_TRANSFORMATION_SCALE = 0.24;
// Offset to position elements properly
const INFORMATION_BOX_X_OFFSET = 30;

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('infinity-logo-layer').
        addEventListener('mouseover', (evt) => {
            if (evt.target.classList.contains('infinity-link') &&
                document.getElementById('infinity-information-layer')?.
                    querySelector(`#${evt.target.id}-information`) == null ) {
                displayInformationBox(evt);
            } else if (!evt.target.classList.contains('infinity-link') &&
                !evt.target.classList.contains('infinity-info')) {
                document.getElementById('infinity-information-layer')?.remove();
            }
        });
});

function displayInformationBox(evt) {
    document.getElementById('infinity-information-layer')?.remove();

    const linkId = evt.target.id;

    const linkAdress = INFINITY_LOGO_LINK_ADRESS_MAP.get(linkId);

    const infinityInformationLayer = createInformationBox(evt.target, linkId, linkAdress);

    document.getElementById('infinity-logo-layer').append(infinityInformationLayer);
}

function createInformationBox(target, linkId, linkAdress) {
    const svgns = 'http://www.w3.org/2000/svg';
    const infinityInformationLayer = document.createElementNS(svgns, 'g');
    infinityInformationLayer.setAttribute('id', 'infinity-information-layer');

    const infinityLogoTextStyle =
    window.getComputedStyle(document.getElementById(target.id));
    const xPositionInfinityLogoText =
    parseFloat(infinityLogoTextStyle.getPropertyValue('--x'));
    const yPositionInfinityLogoText =
    parseFloat(infinityLogoTextStyle.getPropertyValue('--y'));

    const informationBoxYOffset = yPositionInfinityLogoText + 
        (parseFloat(target.getAttribute('height') *
            parseFloat(infinityLogoTextStyle.getPropertyValue('--scale'))));

    let informationBox = document.getElementById(linkId + '-information')
    .cloneNode(true);
    informationBox.setAttribute('class', 'infinity-info');
    informationBox.setAttribute('x',
        xPositionInfinityLogoText - INFORMATION_BOX_X_OFFSET);
    informationBox.setAttribute('y', informationBoxYOffset);
    informationBox.setAttribute('height', informationBox.getAttribute('height') *
        INFORMATION_BOX_TRANSFORMATION_SCALE);
    informationBox.setAttribute('width', informationBox.getAttribute('width') *
        INFORMATION_BOX_TRANSFORMATION_SCALE);
    informationBox.removeAttribute('transform');

    const readMoreButton = document.getElementById('infinity-read-more-svg')
    .cloneNode(true);
    readMoreButton.setAttribute('class', 'cls-1 infinity-info');
    readMoreButton.setAttribute('height', readMoreButton.getAttribute('height') *
        INFORMATION_BOX_TRANSFORMATION_SCALE);
    readMoreButton.setAttribute('width', readMoreButton.getAttribute('width') *
        INFORMATION_BOX_TRANSFORMATION_SCALE);
    readMoreButton.setAttribute('x',
        parseFloat(informationBox.getAttribute('x')) +
            (parseFloat(informationBox.getAttribute('width') / 2) -
                (parseFloat(readMoreButton.getAttribute('width')) / 2)));
    readMoreButton.setAttribute('y', 
        (parseFloat(informationBox.getAttribute('y')) +
            (parseFloat(informationBox.getAttribute('height')) -
                (parseFloat(readMoreButton.getAttribute('height')))) - 5));
    readMoreButton.removeAttribute('transform');

    const readMoreLink = document.createElementNS(svgns, 'a');
    readMoreLink.setAttribute('href', linkAdress);
    readMoreLink.append(readMoreButton);

    infinityInformationLayer.append(informationBox);
    infinityInformationLayer.append(readMoreLink);
    infinityInformationLayer.classList.add('fade-in');

    return infinityInformationLayer;
}
