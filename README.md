# leaflet-layers-panel

This project provides a list contains base-layers and over-layers for leaflet.js

## Demos

After you downloaded or cloned the project, you can open index.html under the example folder.

## Getting Started

Several quick start options are available:

- Insert `<script src="js/chmap-leaflet-layers-panel.js"></script>` into the `<head>` tag.
- Install with npm: `npm install @chmap/leaflet-layers-panel`
- Install with yarn: `yarn add @chmap/leaflet-layers-panel`

## Usage with the scrip tag

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <meta http-equiv="x-ua-compatible" content="ie=edge"/>
    <title>CHMap</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin=""/>
    <link href="css/index.css" rel="stylesheet" />
    <script src="js/chmap-leaflet-layers-panel.js"></script>
</head>
<body>
    <div id="map" />
</body>
</html>
```

You can extract components from the global variable, chmapLeafletLayersPanel, such as:

```
const { MapLayersController } = window.chmapLeafletLayersPanel;

MapLayersController.init('map');
```

Please browse all files under the example folder for more detail usage.

## Building from the source

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <meta http-equiv="x-ua-compatible" content="ie=edge"/>
    <title>CHMap</title>
    <link href="css/index.css" rel="stylesheet" />
</head>
<body>
    <div id="map" />
    <script src="js/index.js"></script>
</body>
</html>
```

```
import { MapLayersController } from "@chmap/leaflet-layers-panel";

MapLayersController.init('map');

const map = MapLayersController.getMap();
```


## License

Licensed under the [GNU GPLv3](LICENSE) license.
