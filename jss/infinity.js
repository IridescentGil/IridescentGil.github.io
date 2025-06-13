window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('infinity-logo-layer').addEventListener('mouseover', (evt) => {
        const svgns = 'http://www.w3.org/2000/svg';

        if (evt.target.classList.contains('infinity-link') && document.getElementById('infinity-svg-layer-2')?.querySelector(`#${evt.target.id}-information`) == null) {
            displayInformationBox(evt);
        }
        else if (!evt.target.classList.contains('infinity-link') && !evt.target.classList.contains('infinity-info')) {
            const animationFade = document.createElementNS(svgns, 'animate');
            animationFade.setAttribute('id', 'infinity-info-fadeaout');
            animationFade.setAttribute('attributeName', 'opacity');
            animationFade.setAttribute('begin', 'indefinite');
            animationFade.setAttribute('dur', '0.2s');
            animationFade.setAttribute('from', '1');
            animationFade.setAttribute('to', '0');
            animationFade.setAttribute('fill', 'freeze');

            const infinityinformationLayer = document.getElementById('infinity-svg-layer-2');
            if (infinityinformationLayer) {
                infinityinformationLayer.prepend(animationFade);
                document.getElementById('infinity-info-fadeaout').beginElement();
                setTimeout(() => {
                    infinityinformationLayer.remove();
                }, 200);
            }

        }
    })
});

function displayInformationBox(evt) {
    document.getElementById('infinity-svg-layer-2')?.remove();

    const linkId = evt.target.id;
    const linkAdressArray = new Map([
        ['it-demand-and-service-management', 'https://www.google.com'],
        ['system-and-process-assurance', 'https://www.google.com'],
        ['financial-services-and-payment-processing', 'https://www.google.com'],
        ['human-capital-management', 'https://www.google.com'],
        ['data-analytics-and-reporting', 'https://www.google.com'],
        ['digital-tranformation-and-enablement', 'https://www.google.com'],
        ['consumer-and-enterprise-vetting', 'https://www.google.com'],
        ['contact-centre', 'https://www.google.com'],
        ['consumer-enterprise-and-collections', 'https://www.google.com'],
        ['billing-management', 'https://www.google.com']
    ]
    );

    const linkAdress = linkAdressArray.get(linkId);

    const infinityInformationLayer = createInformationBox(evt, linkId, linkAdress);

    document.getElementById('infinity-logo-layer').append(infinityInformationLayer);

    const animations = document.getElementById('infinity-svg-layer-2')
    .getElementsByTagName('animate');

    for (let i = 0; i < animations.length; i++) {
        animations[i].beginElement();
    }
}


function createInformationBox(evt, linkId, linkAdress) {
    const svgns = 'http://www.w3.org/2000/svg';
    const infinityInformationLayer = document.createElementNS(svgns, 'g');
    infinityInformationLayer.setAttribute('id', 'infinity-svg-layer-2');

    const infinityLogoTextStyle = window.getComputedStyle(document.getElementById(evt.target.id));
    const xPositionInfinityLogoText = parseInt(infinityLogoTextStyle.getPropertyValue('--x'));
    const yPositionInfinityLogoText = parseInt(infinityLogoTextStyle.getPropertyValue('--y'));


    // Apply tranform scale to height and with to allow the removal of tranform attribute for consistent placement
    const INFORMATION_BOX_TRANSFORMATION_SCALE = 0.24;
    const INFORMATION_BOX_TRANSFORMATION_SCALE_SMALL = 0.34;
    // Offsets to position elements properly
    const INFORMATION_BOX_X_OFFSET = 40;
    const INFORMATION_BOX_Y_OFFSET = 30;
    const READ_MORE_BACKGROUND_Y_OFFSET = 12;
    const READ_MORE_TEXT_Y_OFFSET = 19;
    const READ_MORE_BACKGROUND_X_OFFSET = 14;
    const READ_MORE_TEXT_X_OFFSET = 21;

    let informationBox;
    if (window.location.hash === "#left" || window.location.hash === "#center" || window.location.hash === "#right") {
        const hash = window.location.hash.substring(1);
        informationBox = document.getElementById(linkId + '-information-' + hash)
        .cloneNode(true);
    } else {
        informationBox = document.getElementById(linkId + '-information')
        .cloneNode(true);
    }
    informationBox.setAttribute('class', 'infinity-info');
    informationBox.setAttribute('x', xPositionInfinityLogoText - INFORMATION_BOX_X_OFFSET);
    informationBox.setAttribute('y', yPositionInfinityLogoText + INFORMATION_BOX_Y_OFFSET);
    informationBox.setAttribute('opacity', '0');
    if (parseInt(window.innerWidth) < 550) {
    informationBox.setAttribute('height', informationBox.getAttribute('height') *
        INFORMATION_BOX_TRANSFORMATION_SCALE_SMALL);
    informationBox.setAttribute('width', informationBox.getAttribute('width') *
        INFORMATION_BOX_TRANSFORMATION_SCALE_SMALL);
    informationBox.removeAttribute('transform');

    } else {
    informationBox.setAttribute('height', informationBox.getAttribute('height') *
        INFORMATION_BOX_TRANSFORMATION_SCALE);
    informationBox.setAttribute('width', informationBox.getAttribute('width') *
        INFORMATION_BOX_TRANSFORMATION_SCALE);
    informationBox.removeAttribute('transform');
    }

    const informationBoxHeight = parseInt(informationBox.getAttribute('height'));
    const yPositionReadMoreBackground = informationBoxHeight + yPositionInfinityLogoText + READ_MORE_BACKGROUND_Y_OFFSET;
    const yPositionReadMoreText = informationBoxHeight + yPositionInfinityLogoText + READ_MORE_TEXT_Y_OFFSET;

    const readMoreBackground = document.getElementById('read-more-background')
    .cloneNode(true);
    readMoreBackground.setAttribute('class', 'cls-1 infinity-info');
    readMoreBackground.setAttribute('x', xPositionInfinityLogoText + READ_MORE_BACKGROUND_X_OFFSET);
    readMoreBackground.setAttribute('y', yPositionReadMoreBackground);
    readMoreBackground.setAttribute('opacity', '0');

    const readMoreText = document.getElementById('read-more-text')
    .cloneNode(true);
    readMoreText.setAttribute('class', 'cls-4 infinity-info');
    readMoreText.setAttribute('x', xPositionInfinityLogoText + READ_MORE_TEXT_X_OFFSET);
    readMoreText.setAttribute('y', yPositionReadMoreText);
    readMoreText.setAttribute('opacity', '0');
    readMoreText.removeAttribute('transform');

    const animationFadeIn = document.createElementNS(svgns, 'animate');
    animationFadeIn.setAttribute('attributeName', 'opacity');
    animationFadeIn.setAttribute('begin', 'indefinite');
    animationFadeIn.setAttribute('dur', '0.5s');
    animationFadeIn.setAttribute('from', '0');
    animationFadeIn.setAttribute('to', '1');
    animationFadeIn.setAttribute('fill', 'freeze');

    const link = document.createElementNS(svgns, "a");
    link.setAttribute('href', linkAdress);
    link.append(readMoreBackground);
    link.append(readMoreText);

    readMoreBackground.append(animationFadeIn.cloneNode(true));
    readMoreText.append(animationFadeIn.cloneNode(true));
    informationBox.append(animationFadeIn);

    infinityInformationLayer.append(informationBox);
    infinityInformationLayer.append(link);

    return infinityInformationLayer;
}
