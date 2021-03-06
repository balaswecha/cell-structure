define(function(require) {
    'use strict';
    var inherit = require('PHET_CORE/inherit');
    var Node = require('SCENERY/nodes/Node');
    var MicroscopeInstrumentNode = require('CELL_STRUCTURE/cell-structure/view/MicroscopeInstrumentNode');
    var MagnifierViewNode = require('CELL_STRUCTURE/cell-structure/view/MagnifierViewNode');
    var Bounds2 = require('DOT/Bounds2');
    var Vector2 = require('DOT/Vector2');
    var Dimension2 = require('DOT/Dimension2');
    var Rectangle = require('SCENERY/nodes/Rectangle');
    var TextPushButton = require('SUN/buttons/TextPushButton');
    var PhetFont = require('SCENERY_PHET/PhetFont');

    function MicroscopeNode(model, modelViewTransform) {
        model.size = new Dimension2(100, 150); // to set the listening area of microscope
        Node.call(this, {
            x: model.location.x,
            y: model.location.y
        });
        var instrumentNode = new MicroscopeInstrumentNode(model.instrument, {}, modelViewTransform);
        var magnifierViewNode = new MagnifierViewNode(model.magnifierView, {
            x: -20,
            y: -130
        }, modelViewTransform);
        var removeButton = new TextPushButton("X", {
            font: new PhetFont(16),
            baseColor: 'yellow',
            x: 0,
            y: 70,
            listener: function() {
                CS.trigger('ApparatusRemoved', { model: model, node: this });
            }.bind(this)
        });
        this.addChild(removeButton);
        this.addChild(instrumentNode);
        this.addChild(magnifierViewNode);

        // Scale it so it matches the model width and height
        this.scale(1, 1);

        this.setLeft(0);
        this.setBottom(350);

        CS.addDropListener(this);
        this.onReceiveDrop = model.onReceiveDrop;
        this.unregisterObservers = function() {
            CS.removeDropListener(this);
        };
    }
    return inherit(Node, MicroscopeNode);
});
