// $import.regist("dag/Service", require("./services/index.js"));
// $import.regist("dag/Common", require("./common/index.js"));
$import.regist("dag/Style", require("./style/index.js"));

//test
$import.registSync("dag/common", require("../modules/src/common/index.js"));

$import.regist("dag/modules/Frameset", require("../modules/src/modules/Frameset/index.js"));


$import.regist("dag/modules/Screen", require("../modules/src/modules/Screen/index.js"));
$import.regist("dag/modules/Config", require("../modules/src/modules/Config/index.js"));

$import.regist("dag/components/Charts", require("../modules/src/components/Charts/index.js"));
$import.regist("dag/components/Counter", require("../modules/src/components/Counter/index.js"));
$import.regist("dag/components/Edittable", require("../modules/src/components/Edittable/index.js"));

