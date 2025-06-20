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

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('infinity-logo-layer').
        addEventListener('mouseover', (evt) => {
            const svgns = 'http://www.w3.org/2000/svg';

            if (evt.target.classList.contains('infinity-link') &&
                document.getElementById('infinity-information-layer')?.
                    querySelector(`#${evt.target.id}-information`) == null ) {
                displayInformationBox(evt);
            } else if (!evt.target.classList.contains('infinity-link') &&
                !evt.target.classList.contains('infinity-info')) {
                const animationFade = document.createElementNS(svgns, 'animate');
                animationFade.setAttribute('id', 'infinity-info-fadeaout');
                animationFade.setAttribute('attributeName', 'opacity');
                animationFade.setAttribute('begin', 'indefinite');
                animationFade.setAttribute('dur', '0.2s');
                animationFade.setAttribute('from', '1');
                animationFade.setAttribute('to', '0');
                animationFade.setAttribute('fill', 'freeze');

                const infinityinformationLayer =
                document.getElementById('infinity-information-layer');
                if (infinityinformationLayer) {
                    infinityinformationLayer.prepend(animationFade);
                    document.getElementById('infinity-info-fadeaout').beginElement();
                    setTimeout(() => {
                        infinityinformationLayer.remove();
                    }, 200);
                }
            }
        });
});

function displayInformationBox(evt) {
    document.getElementById('infinity-information-layer')?.remove();

    const linkId = evt.target.id;

    const linkAdress = INFINITY_LOGO_LINK_ADRESS_MAP.get(linkId);

    const infinityInformationLayer = createInformationBox(evt, linkId, linkAdress);

    document.getElementById('infinity-logo-layer').append(infinityInformationLayer);

    const animations = document.getElementById('infinity-information-layer')
    .getElementsByTagName('animate');

    for (let i = 0; i < animations.length; i++) {
        animations[i].beginElement();
    }
}


function createInformationBox(evt, linkId, linkAdress) {
    const svgns = 'http://www.w3.org/2000/svg';
    const infinityInformationLayer = document.createElementNS(svgns, 'g');
    infinityInformationLayer.setAttribute('id', 'infinity-information-layer');

    const infinityLogoTextStyle =
    window.getComputedStyle(document.getElementById(evt.target.id));
    const xPositionInfinityLogoText =
    parseFloat(infinityLogoTextStyle.getPropertyValue('--x'));
    const yPositionInfinityLogoText =
    parseFloat(infinityLogoTextStyle.getPropertyValue('--y'));


    // Apply tranform scale to height and with to
    // allow the removal of tranform attribute for consistent placement
    const INFORMATION_BOX_TRANSFORMATION_SCALE = 0.24;
    // Offset to position elements properly
    const INFORMATION_BOX_X_OFFSET = 30;

    const informationBoxYOffset = yPositionInfinityLogoText + 
        (parseFloat(evt.target.getAttribute('height') *
            parseFloat(infinityLogoTextStyle.getPropertyValue('--scale'))));

    let informationBox = document.getElementById(linkId + '-information')
    .cloneNode(true);
    informationBox.setAttribute('class', 'infinity-info');
    informationBox.setAttribute('x',
        xPositionInfinityLogoText - INFORMATION_BOX_X_OFFSET);
    informationBox.setAttribute('y', informationBoxYOffset);
    informationBox.setAttribute('opacity', '0');
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
            (parseFloat(informationBox.getAttribute('width')/ 2) -
                (parseFloat(readMoreButton.getAttribute('width')) / 2)));
    readMoreButton.setAttribute('y', 
        (parseFloat(informationBox.getAttribute('y')) +
            (parseFloat(informationBox.getAttribute('height')) -
                (parseFloat(readMoreButton.getAttribute('height')))) - 5));
    readMoreButton.setAttribute('opacity', '0');
    readMoreButton.removeAttribute('transform');

    const animationFadeIn = document.createElementNS(svgns, 'animate');
    animationFadeIn.setAttribute('attributeName', 'opacity');
    animationFadeIn.setAttribute('begin', 'indefinite');
    animationFadeIn.setAttribute('dur', '0.5s');
    animationFadeIn.setAttribute('from', '0');
    animationFadeIn.setAttribute('to', '1');
    animationFadeIn.setAttribute('fill', 'freeze');

    const readMoreLink = document.createElementNS(svgns, 'a');
    readMoreLink.setAttribute('href', linkAdress);
    readMoreLink.append(readMoreButton);

    readMoreButton.append(animationFadeIn.cloneNode(true));
    informationBox.append(animationFadeIn);

    infinityInformationLayer.append(informationBox);
    infinityInformationLayer.append(readMoreLink);

    return infinityInformationLayer;
}
