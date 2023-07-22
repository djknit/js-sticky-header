const HEADER_ID = 'pg-sticky-header';
const SPACER_ID = 'pg-sticky-head-spacer';

$(document).ready(function() { 
    runMeasuringProcess(50, 2000);
});

$(window).on('resize', function() {
    resetStyles();
    runMeasuringProcess();
});


function runMeasuringProcess(tries, waitTime) {
    const isTriesSpecified = typeof tries == 'number';
    if (isTriesSpecified && tries <= 0) {
        return;
    }
    const headerHeight = getHeaderHeight();
    if (headerHeight) {
        setSpacerHeight(headerHeight);
    }
    else if (isTriesSpecified) {
        setTimeout(
            function() {
                runMeasuringProcess(--tries)
            },
            typeof waitTime == 'number' ? waitTime : 150
        );
    }
}

function getJqueryFor(elId) {
    return $(`${elId}`);
}

function getHeaderHeight() {
    const headerEl = getJqueryFor(HEADER_ID);
    if (headerEl && headerEl.outerHeight) {
        return headerEl.outerHeight(false);
    }
}

function setSpacerHeight(height) {
    if (!height)return;
    const spacerEl = getJqueryFor(SPACER_ID);
    const headerEl = getJqueryFor(HEADER_ID);
    headerEl.css('position', 'fixed');
    spacerEl.prop(
        'style',
        `display:block!important; position:static!important; width:auto:!important; height:${height}px!important; max-height:${height}px!important;`
    );
}

function resetStyles() {
    const spacerEl = getJqueryFor(SPACER_ID);
    const headerEl = getJqueryFor(HEADER_ID);
    headerEl.prop('style', 'width:100%;');
    spacerEl.prop('style', 'display:none;');
}
