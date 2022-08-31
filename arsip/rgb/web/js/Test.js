"use strict";
var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Test {
            files = [
                ".\\data\\test2.txt",
                ".\\data\\test.txt",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\mak\\anim\\anim.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\GCUK_Tuts\\animation.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\array.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\array1.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\array2.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\Richard_Betson\\Big_Bang_1b\\Big_Bang_1b.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\Richard_Betson\\Binary_Cage_12\\Binary_Cage_12.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\AGore\\BirdDemo\\BirdDemo.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\warpy\\blitzdoc.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\RobHutchinson\\BloxAndSpheres\\blox&spheres.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\MattDavey\\Matts Balls\\bouncey.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\RobCummings\\Bumpy\\bumpyfun.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\GCUK_Tuts\\camera.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\mak\\castle\\castle.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\mak\\collide\\collide.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\GCUK_Tuts\\collision.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\si\\matrix\\command_ref.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\counter.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\RobHutchinson\\CraftFlare\\CraftFlare.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\mak\\createanim\\createanim.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\Hi-Toro\\Death Island\\deathisland.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\mak\\detailtex\\detailtex.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\birdie\\dolphin\\dolphin.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\birdie\\dominos\\dominos.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\doublebuffering.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\mak\\dragon\\dragon.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\mak\\driver\\driver.bb",
                "C:\\Program Files (x86)\\Blitz3D\\Games\\bb3d_asteroids\\EdzUpAsteroids.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\Richard_Betson\\emerald_gate\\Emerald_Gate_1.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\end if.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\si\\matrix\\example.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\RobHutchinson\\BBLauncher\\example.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\birdie\\Explode\\Explode.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\mak\\fakelight\\fakelight.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\mak\\firepaint3d\\firepaint3d.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\mak\\flag\\flag.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\Skully\\flares\\flares.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\for next loop.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\si\\fps\\fps.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\birdie\\Spherical Landscapes\\functions.bb",
                "C:\\Program Files (x86)\\Blitz3D\\Games\\TunnelRun\\functions.bb",
                "C:\\Program Files (x86)\\Blitz3D\\Games\\TunnelRun\\globs.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\goto.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\goto1.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\AGore\\GrassDemo\\Grass.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\hello.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\if then.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\if then1.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\input.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\input1.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\mak\\insaner\\insaner.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\mak\\insectoids\\insectoids.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\AGore\\HeadDemo\\KBSplines.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\AGore\\BirdDemo\\KBSplines.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\RobHutchinson\\BBLauncher\\launcher2d.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\RobHutchinson\\SkyPlateau\\launcher3d.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\RobHutchinson\\BBLauncher\\launcher3d.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\Hi-Toro\\Death Island\\incs\\lensHowTo.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\Hi-Toro\\Death Island\\incs\\lensIncs.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\halo\\Lightmap\\lightmap.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\birdie\\thunder\\lightning.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\GCUK_Tuts\\lights.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\mak\\lights\\lights.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\birdie\\LodMesh\\lmesh.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\birdie\\texpaint\\main.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\birdie\\CameraPickST\\CameraPickST\\main.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\birdie\\Jet Tails\\Main.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\birdie\\Fire Effect\\Fire Effect\\Main.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\mak\\anim\\makbot\\MAK-sfx.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\maths.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\si\\matrix\\matrix.bb",
                "C:\\Program Files (x86)\\Blitz3D\\mediaview\\mediaview.bb",
                "C:\\Program Files (x86)\\Blitz3D\\Games\\wing_ring\\menus.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\halo\\MeshFX\\meshfx.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\birdie\\Mirror\\mirror.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\RobHutchinson\\ModelChildren\\modelchildren.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\GCUK_Tuts\\movement.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\mak\\multi_tex\\multi_tex.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\mak\\multicam\\multicam.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\Richard_Betson\\orbit_nebula_source\\orbit.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\mak\\pick\\pick.bb",
                "C:\\Program Files (x86)\\Blitz3D\\Games\\wing_ring\\player2.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\Richard_Betson\\Power_fountain_b\\power_fountian_b.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\mak\\primitives\\primitives.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\print.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\RobCummings\\PyromaniaBB\\PyromaniaBB-1.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\birdie\\Quick Deform\\qd.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\random numbers.bb",
                "C:\\Program Files (x86)\\Blitz3D\\Games\\wing_ring\\readme.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\zenith\\scare\\scare.bb",
                "C:\\Program Files (x86)\\Blitz3D\\Games\\wing_ring\\scenery.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\GCUK_Tuts\\settingup.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\halo\\Shadows\\shadows.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\Hi-Toro\\Shooter\\Shooter\\shooter-testbed.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\simple maths.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\RobHutchinson\\SkyPlateau\\SkyPlateau.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\birdie\\2d-3dsprites\\sprites.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\Skully\\start.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\RobHutchinson\\WateryTerrain\\start.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\RobHutchinson\\ModelChildren\\start.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\RobHutchinson\\CraftFlare\\start.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\RobCummings\\PyromaniaBB\\start.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\Richard_Betson\\start.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\mak\\start.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\halo\\start.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\AGore\\start.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\step.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\birdie\\lodBalls\\subdiv.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\birdie\\te\\TE.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\mak\\teapot\\teapot.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\birdie\\UVMapping\\UVMapping\\test.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\birdie\\Spherical Landscapes\\testbed.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\mak\\tex_render\\tex_render.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\GCUK_Tuts\\texture.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\AGore\\HeadDemo\\TheHead.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\birdie\\thunder\\thunder.bb",
                "C:\\Program Files (x86)\\Blitz3D\\Games\\TunnelRun\\tr.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\mak\\tron\\tron.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\birdie\\Terrain Tiling\\tt.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\birdie\\Brush Tiles\\tt.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\types1.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\types2.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\variables.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\variables1.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\variables2.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\basic_tuts\\variables3.bb",
                "C:\\Program Files (x86)\\Blitz3D\\tutorials\\GCUK_Tuts\\vertex.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\RobHutchinson\\WateryTerrain\\water.bb",
                "C:\\Program Files (x86)\\Blitz3D\\Games\\wing_ring\\wing_ring.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\RobHutchinson\\WingPilot\\WingPilotV0_01.bb",
                "C:\\Program Files (x86)\\Blitz3D\\samples\\mak\\xfighter\\xfighter.bb",
            ];
            async parse(file) {
                let hsl = await ha.comp.Util.Ajax2('get', file, '');
                // console.group("file");
                // console.log(hsl);
                // console.groupEnd();
                await ha.parse.parse.parse(hsl);
            }
            async load2() {
                let l = this.files.length;
                // l = 5;
                for (let i = 0; i < l; i++) {
                    let file = this.files[i];
                    console.log("File: " + file);
                    try {
                        await this.parse(file);
                    }
                    catch (e) {
                        console.log('file: ' + file);
                        console.error(e);
                        break;
                    }
                }
            }
        }
        parse.test = new Test();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
window.onload = () => {
    ha.parse.test.load2().catch((e) => {
        console.error(e);
    });
    // ha.parse.test.load('./data/test2.txt');
    // ha.parse.test.parse('./data/test.txt');
};
