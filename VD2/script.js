const DNA_SEQUENCES = {
    11: "AACGACTGCACCACG",
    12: "CTCTCCCTGTACCCA",
    13: "ACCCCTCTCGCTCTT",
    14: "TTCTGCCTTGATCCG",
    21: "TGTTGTCTTATCCAT",
    22: "TCAGATGCTACGTGT",
    23: "ACCGTACTCGACCTA",
    24: "TCGGATCTCGGTTTC",
    31: "TACACGCTGGTCAAT",
    32: "CACTATCTCGAATCA",
    33: "GCGTGACTGCGGCAT",
    34: "GTTGGTCTTGTAGGA",
    41: "GCTAGGCTATCGCGT",
    42: "TAATACCTGAGCGGG",
    43: "TACCCCCTAGTCTGC",
    44: "AACGGACTTCAACAG",
    61: "CGGGATCTCGTCGGT",
    62: "ATCGCTCTCCATGCA",
    63: "ATCTATCTCGTTCCG",
    64: "ACTCCGCTCGACTTA",
    71: "GGATCACTTACGTAT",
    72: "GGTAGCCTTTTATCG",
    73: "CATTGCCTCGATATC",
    74: "CCAGACCTTTCAAGT",
    81: "TGCGTACTTTGGGTC",
    82: "TCAGGGCTACGCAAG",
    83: "TAATTACTGTTTCAC",
    84: "GGATGCCTGGCGTCT",
    91: "TGCTATCTCGACAAG",
    92: "CTCAGGCTGTGTATT",
    93: "CAGAGCTATACGGAG",
    94: "GCTACTCTGGGTGCT"
};
const LIST_HINH_VUONG = document.querySelectorAll(".hinhvuong");
const PLAYER_INPUT = document.querySelector("#player-input");
const KET_THUC = document.querySelector("#ketthuc");
const SUBMIT_BUTTON = document.querySelector("#submit-button");
let TrangThaiBanCo = ["AAAAAAAAAAAAAAA", "AAAAAAAAAAAAAAA", "AAAAAAAAAAAAAAA", "AAAAAAAAAAAAAAA", "TTTTTTTTTTTTTTT", "AAAAAAAAAAAAAAA", "AAAAAAAAAAAAAAA", "AAAAAAAAAAAAAAA", "AAAAAAAAAAAAAAA"];
let LuotChoi = 0.5;
InBanCo();
function CoppyInput(id) {
    const sequence = document.getElementById(`seq${id}`).innerText;
    PLAYER_INPUT.value = sequence;
}
SUBMIT_BUTTON.addEventListener("click", function () {
    LuotCuaNguoi(PLAYER_INPUT.value);
    InBanCo();
    PLAYER_INPUT.value = '';
    LuotCuaAI();
    InBanCo();
    if (KiemTraBanCoKetThuc()) {
        setTimeout(function () {
            KET_THUC.textContent = ("=> Kết thúc!");
        }, 200);
    }
});

function KiemTraBanCoKetThuc() {
    if (LuotChoi === 5) {
        SUBMIT_BUTTON.style.pointerEvents = "none";
        return true;
    }
    if ((LIST_HINH_VUONG[0].textContent != " " && LIST_HINH_VUONG[0].textContent === LIST_HINH_VUONG[1].textContent && LIST_HINH_VUONG[2].textContent === LIST_HINH_VUONG[1].textContent) ||
        (LIST_HINH_VUONG[3].textContent != " " && LIST_HINH_VUONG[3].textContent === LIST_HINH_VUONG[4].textContent && LIST_HINH_VUONG[5].textContent === LIST_HINH_VUONG[3].textContent) ||
        (LIST_HINH_VUONG[6].textContent != " " && LIST_HINH_VUONG[6].textContent === LIST_HINH_VUONG[7].textContent && LIST_HINH_VUONG[8].textContent === LIST_HINH_VUONG[6].textContent) ||
        (LIST_HINH_VUONG[0].textContent != " " && LIST_HINH_VUONG[0].textContent === LIST_HINH_VUONG[3].textContent && LIST_HINH_VUONG[6].textContent === LIST_HINH_VUONG[0].textContent) ||
        (LIST_HINH_VUONG[1].textContent != " " && LIST_HINH_VUONG[1].textContent === LIST_HINH_VUONG[4].textContent && LIST_HINH_VUONG[7].textContent === LIST_HINH_VUONG[1].textContent) ||
        (LIST_HINH_VUONG[2].textContent != " " && LIST_HINH_VUONG[2].textContent === LIST_HINH_VUONG[5].textContent && LIST_HINH_VUONG[8].textContent === LIST_HINH_VUONG[2].textContent) ||
        (LIST_HINH_VUONG[0].textContent != " " && LIST_HINH_VUONG[0].textContent === LIST_HINH_VUONG[4].textContent && LIST_HINH_VUONG[8].textContent === LIST_HINH_VUONG[0].textContent) ||
        (LIST_HINH_VUONG[2].textContent != " " && LIST_HINH_VUONG[2].textContent === LIST_HINH_VUONG[4].textContent && LIST_HINH_VUONG[6].textContent === LIST_HINH_VUONG[2].textContent)) {
        return true;
    } else {
        return false;
    }
}
function InBanCo() {
    LuotChoi += 0.5;
    KET_THUC.textContent = "Lượt: " + LuotChoi;
    UpdateButtons();
    for (let i = 0; i < LIST_HINH_VUONG.length; i++) {
        if (TrangThaiBanCo[i] === "TTTTTTTTTTTTTTT") {
            LIST_HINH_VUONG[i].textContent = "X";
        } else if (TrangThaiBanCo[i] === "AAAAAAAAAAAAAAA") {
            LIST_HINH_VUONG[i].textContent = " ";
        } else {
            LIST_HINH_VUONG[i].textContent = "O";
        }
    }
}
function LuotCuaNguoi(a) {
    let b = LayKey(a);
    TrangThaiBanCo[Math.floor(b / 10) - 1] = a;
}
function LayKey(a) {
    for (var key in DNA_SEQUENCES) {
        if (DNA_SEQUENCES[key] === a) {
            return key;
        }
    }
}
function LuotCuaAI() {
    check1();
    check2();
    check3();
    check4();
    check6();
    check7();
    check8();
    check9();
}
function DiChuyenBuocDiCuaAI(a) {
    TrangThaiBanCo[a - 1] = "TTTTTTTTTTTTTTT";
}
function KiemTraGiaTriTonTaiDNABanCo(value) {
    return TrangThaiBanCo.indexOf(value) !== -1;
}
function KiemTraGiaTriTrongBanCo(value) {
    return (TrangThaiBanCo[value - 1] != "AAAAAAAAAAAAAAA");
}
function UpdateButtons() {
    for (let j = 1; j <= 9; j++) {
        for (let i = 1; i <= 4; i++) {
            if (j === 5) {
                continue;
            }
            var button = document.getElementById("button" + j + i);
            if (i === LuotChoi) {
                button.style.backgroundColor = "green";
                button.style.color = "white";
            } else {
                button.style.backgroundColor = "buttonface";
                button.style.color = "white";
            }
        }
    }
}
function check1() {
    if (KiemTraGiaTriTrongBanCo(1)) return;

    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[21]) && KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[62])) DiChuyenBuocDiCuaAI(1);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[33]) && KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[44])) DiChuyenBuocDiCuaAI(1);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[82]) && KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[73])) DiChuyenBuocDiCuaAI(1);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[71]) && KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[42])) DiChuyenBuocDiCuaAI(1);

    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[62]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[73]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[21]))) DiChuyenBuocDiCuaAI(1);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[62]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[83]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[21]))) DiChuyenBuocDiCuaAI(1);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[62]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[23]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[21]))) DiChuyenBuocDiCuaAI(1);

    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[42]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[73]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[71]))) DiChuyenBuocDiCuaAI(1);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[42]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[33]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[71]))) DiChuyenBuocDiCuaAI(1);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[42]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[23]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[71]))) DiChuyenBuocDiCuaAI(1);
}
function check2() {

    if (KiemTraGiaTriTrongBanCo(2)) return;


    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[11]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[32]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[22]))) DiChuyenBuocDiCuaAI(2);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[11]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[42]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[22]))) DiChuyenBuocDiCuaAI(2);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[11]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[62]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[22]))) DiChuyenBuocDiCuaAI(2);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[11]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[72]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[22]))) DiChuyenBuocDiCuaAI(2);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[11]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[92]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[22]))) DiChuyenBuocDiCuaAI(2);

    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[41]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[12]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[22]))) DiChuyenBuocDiCuaAI(2);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[41]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[32]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[22]))) DiChuyenBuocDiCuaAI(2);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[41]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[62]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[22]))) DiChuyenBuocDiCuaAI(2);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[41]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[72]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[22]))) DiChuyenBuocDiCuaAI(2);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[41]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[92]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[22]))) DiChuyenBuocDiCuaAI(2);

    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[62]) && KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[13])) DiChuyenBuocDiCuaAI(2);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[93]) && KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[34])) DiChuyenBuocDiCuaAI(2);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[91])) DiChuyenBuocDiCuaAI(2);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[61])) DiChuyenBuocDiCuaAI(2);
}

function check3() {


    if (KiemTraGiaTriTrongBanCo(3)) return;

    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[11]) && KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[22])) DiChuyenBuocDiCuaAI(3);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[61]) && KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[82])) DiChuyenBuocDiCuaAI(3);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[42]) && KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[13])) DiChuyenBuocDiCuaAI(3);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[93]) && KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[24])) DiChuyenBuocDiCuaAI(3);

    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[22]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[63]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[11]))) DiChuyenBuocDiCuaAI(3);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[22]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[93]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[11]))) DiChuyenBuocDiCuaAI(3);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[22]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[13]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[11]))) DiChuyenBuocDiCuaAI(3);

    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[82]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[63]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[61]))) DiChuyenBuocDiCuaAI(3);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[82]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[43]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[61]))) DiChuyenBuocDiCuaAI(3);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[82]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[13]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[61]))) DiChuyenBuocDiCuaAI(3);
}

function check4() {
    if (KiemTraGiaTriTrongBanCo(4)) return;


    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[81]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[22]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[42]))) DiChuyenBuocDiCuaAI(4);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[81]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[92]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[42]))) DiChuyenBuocDiCuaAI(4);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[81]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[72]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[42]))) DiChuyenBuocDiCuaAI(4);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[81]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[32]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[42]))) DiChuyenBuocDiCuaAI(4);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[81]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[12]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[42]))) DiChuyenBuocDiCuaAI(4);

    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[71]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[92]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[42]))) DiChuyenBuocDiCuaAI(4);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[71]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[82]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[42]))) DiChuyenBuocDiCuaAI(4);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[71]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[32]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[42]))) DiChuyenBuocDiCuaAI(4);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[71]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[22]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[42]))) DiChuyenBuocDiCuaAI(4);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[71]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[12]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[42]))) DiChuyenBuocDiCuaAI(4);

    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[22]) && KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[73])) DiChuyenBuocDiCuaAI(4);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[33]) && KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[14])) DiChuyenBuocDiCuaAI(4);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[21])) DiChuyenBuocDiCuaAI(4);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[31])) DiChuyenBuocDiCuaAI(4);
}

function check6() {

    if (KiemTraGiaTriTrongBanCo(6)) return;


    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[21]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[12]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[62]))) DiChuyenBuocDiCuaAI(6);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[21]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[32]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[62]))) DiChuyenBuocDiCuaAI(6);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[21]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[72]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[62]))) DiChuyenBuocDiCuaAI(6);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[21]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[82]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[62]))) DiChuyenBuocDiCuaAI(6);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[21]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[92]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[62]))) DiChuyenBuocDiCuaAI(6);

    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[31]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[12]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[62]))) DiChuyenBuocDiCuaAI(6);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[31]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[22]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[62]))) DiChuyenBuocDiCuaAI(6);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[31]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[72]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[62]))) DiChuyenBuocDiCuaAI(6);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[31]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[82]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[62]))) DiChuyenBuocDiCuaAI(6);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[31]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[92]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[62]))) DiChuyenBuocDiCuaAI(6);

    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[73]) && KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[94])) DiChuyenBuocDiCuaAI(6);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[82]) && KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[33])) DiChuyenBuocDiCuaAI(6);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[71])) DiChuyenBuocDiCuaAI(6);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[81])) DiChuyenBuocDiCuaAI(6);
}
function check7() {
    if (KiemTraGiaTriTrongBanCo(7)) return;

    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[41]) && KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[22])) DiChuyenBuocDiCuaAI(7);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[62]) && KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[93])) DiChuyenBuocDiCuaAI(7);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[13]) && KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[84])) DiChuyenBuocDiCuaAI(7);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[91]) && KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[82])) DiChuyenBuocDiCuaAI(7);

    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[22]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[63]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[41]))) DiChuyenBuocDiCuaAI(7);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[22]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[93]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[41]))) DiChuyenBuocDiCuaAI(7);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[22]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[43]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[41]))) DiChuyenBuocDiCuaAI(7);

    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[82]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[93]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[91]))) DiChuyenBuocDiCuaAI(7);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[82]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[43]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[91]))) DiChuyenBuocDiCuaAI(7);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[82]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[13]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[91]))) DiChuyenBuocDiCuaAI(7);
}
function check8() {
    if (KiemTraGiaTriTrongBanCo(8)) return;

    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[91]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[72]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[82]))) DiChuyenBuocDiCuaAI(8);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[91]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[62]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[82]))) DiChuyenBuocDiCuaAI(8);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[91]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[42]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[82]))) DiChuyenBuocDiCuaAI(8);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[91]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[32]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[82]))) DiChuyenBuocDiCuaAI(8);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[91]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[12]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[82]))) DiChuyenBuocDiCuaAI(8);

    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[61]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[92]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[82]))) DiChuyenBuocDiCuaAI(8);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[61]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[72]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[82]))) DiChuyenBuocDiCuaAI(8);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[61]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[42]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[82]))) DiChuyenBuocDiCuaAI(8);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[61]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[32]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[82]))) DiChuyenBuocDiCuaAI(8);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[61]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[12]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[82]))) DiChuyenBuocDiCuaAI(8);

    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[13]) && KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[74])) DiChuyenBuocDiCuaAI(8);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[42]) && KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[93])) DiChuyenBuocDiCuaAI(8);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[11])) DiChuyenBuocDiCuaAI(8);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[41])) DiChuyenBuocDiCuaAI(8);
}
function check9() {
    if (KiemTraGiaTriTrongBanCo(9)) return;

    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[73]) && KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[64])) DiChuyenBuocDiCuaAI(9);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[22]) && KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[33])) DiChuyenBuocDiCuaAI(9);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[31]) && KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[62])) DiChuyenBuocDiCuaAI(9);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[81]) && KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[42])) DiChuyenBuocDiCuaAI(9);

    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[62]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[73]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[31]))) DiChuyenBuocDiCuaAI(9);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[62]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[83]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[31]))) DiChuyenBuocDiCuaAI(9);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[62]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[33]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[31]))) DiChuyenBuocDiCuaAI(9);

    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[42]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[83]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[81]))) DiChuyenBuocDiCuaAI(9);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[42]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[33]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[81]))) DiChuyenBuocDiCuaAI(9);
    if (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[42]) && (KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[23]) || KiemTraGiaTriTonTaiDNABanCo(DNA_SEQUENCES[81]))) DiChuyenBuocDiCuaAI(9);
}