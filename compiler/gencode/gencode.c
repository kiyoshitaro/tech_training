#include <stdio.h>
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

#define ERROR_COUNT 39
#define ERROR_MAX_LENGTH 50

// token
#define MAX_IDENT_LEN 10
#define MAX_NUMBER_LEN 6
#define MAX_TOKENTYPE_LEN 10
#define TOKENTYPE_COUNT 37
#define KEYWORD_COUNT 15
#define KEYWORD_START 3

// Symtab
#define MAX_OBJECT 100
#define MAX_LEVEL 5


//Codegen
#define MAX_CODE 500
#define MAX_DATA 500



FILE *input;
int curCh;
int line;

typedef enum
{ //Các loại Token được sử dụng trong PL/0
    NONE = 0,IDENT,NUMBER,
    BEGIN,CALL,CONST,DO,ELSE,
    END,FOR,IF,ODD,PROCEDURE,
    PROGRAM,THEN,TO,VAR,WHILE,
    PLUS,MINUS,TIMES,SLASH,
    EQU,NEQ,LSS,LEQ,GTR,GEQ,
    LPARENT,RPARENT,LBRACK,RBRACK,
    PERIOD,COMMA,SEMICOLON,ASSIGN,PERCENT
} TokenType;

typedef enum {
    NO_ERR = 0,
    // NUMBER_TOO_LARGE,
    // STRAY_SYMBOL,
    MISSING_PROGRAM_NAME,
    MISSING_PROCEDURE_NAME,
    MISSING_CONSTANT_NAME,
    MISSING_VARIABLE_NAME,
    MISSING_PARAMETER_NAME,
    MISSING_FOR_INDEX_NAME,
    MISSING_NUMBER,
    MISSING_KEYWORD_PROGRAM,
    MISSING_KEYWORD_BEGIN,
    MISSING_KEYWORD_END,
    MISSING_KEYWORD_THEN,
    MISSING_KEYWORD_DO,
    MISSING_KEYWORD_TO,
    MISSING_COMMA,
    MISSING_SEMICOLON,
    MISSING_COMMA_OR_SEMICOLON,
    MISSING_SEMICOLON_OR_RPARENT,
    MISSING_PERIOD,
    MISSING_ASSIGN,
    MISSING_EQU,
    MISSING_RPARENT,
    MISSING_RBRACK,
    MISSING_COMPARASION_OPERATOR,
    INVALID_FACTOR,

    TOO_MANY_NAMES,
    REDECLARED_NAME,
    UNDECLARED_VARIABLE,
    UNDECLARED_ARRAY,
    INVALID_ARRAY,
    INVALID_LEFTSIDE,
    UNDECLARED_PROCEDURE,
    INVALID_PROCEDURE,

    DEFINE_AVAILABLE_PROCEDURE,
} ErrorType;

// Symtab
typedef enum {
	OBJ_CONST,
	OBJ_VAR,
	OBJ_ARRAY,
	OBJ_PROC,
} ObjectType;

struct {
	char id[MAX_IDENT_LEN + 1];
	ObjectType type;
	int offset;
	int num;    // num = 1 if type = VAR, CONST or PARAM, = size of array if type = ARRAY, = startCode if type = PROC
} Object[MAX_OBJECT];


struct {
	int base;   // base address 
	int top;    // number of objects
} SymTab[MAX_LEVEL];


TokenType token;
int curCh;
FILE *input;
char id[MAX_IDENT_LEN + 1];



//Codegen
typedef enum {
    OP_LA,      // Load Address     |   t := t + 1, s[t] := base(p) + q;
    OP_LV,      // Load Value       |   t := t + 1, s[t] := s[base(p) + q];
    OP_LC,      // Load Constant    |   t := t + 1, s[t] := q;
    OP_LI,      // Load Indirect    |   s[t] := s[s[t]];
    OP_INT,     // Increment t      |   t := t + q;
    OP_DCT,     // Decrement t      |   t := t - q;
    OP_J,       // Jump             |   pc := q;
    OP_FJ,      // False Jump       |   if s[t] = 0 then pc := q; t := t - 1;
    OP_HL,      // Halt             |   Halt;
    OP_ST,      // Store            |   s[s[t - 1]] := s[t]; t := t - 2;
    OP_CALL,    // Call             |   s[t + 2] := b; s[t + 3] := pc; s[t + 4] := base(p); b := t + 1; pc := q;
    OP_EP,      // Exit Procedure   |   t := b - 1; pc := s[b + 2]; b := s[b + 1];
    OP_EF,      // Exit Function    |   t := b; pc := s[b + 2]; b := s[b + 1];
    OP_RC,      // Read Char        |   read one character into s[s[t]]; t := t - 1;
    OP_RI,      // Read Integer     |   read integer to s[s[t]]; t := t - 1;
    OP_WRC,     // Write Char       |   write one character form s[t]; t := t - 1;
    OP_WRI,     // Write Int        |   write integer from s[t]; t := t - 1;
    OP_WLN,     // New Line         |   CR & LF
    OP_ADD,     // Add              |   t := t - 1; s[t] := s[t] + s[t + 1];
    OP_SUB,     // Substract        |   t := t - 1; s[t] := s[t] - s[t + 1];
    OP_MUL,     // Multiple         |   t := t - 1; s[t] := s[t] * s[t + 1];
    OP_DIV,     // Divide           |   t := t - 1; s[t] := s[t] / s[t + 1];
    OP_MOD,     // Module           |   t := t - 1; s[t] := s[t] % s[t + 1];
    OP_NEG,     // Negative         |   s[t] := - s[t];
    OP_CV,      // Copy Top         |   s[t + 1] := s[t]; t := t + 1;
    OP_EQ,      // Equal            |   t := t - 1; if s[t] = s[t + 1] then s[t] := 1 else s[t] := 0;
    OP_ODD,     // Odd              |   if s[t] % 2 == 1 then s[t] := 1 else s[t] := 0;
    OP_NE,      // Not Equal        |   t := t - 1; if s[t] != s[t + 1] then s[t] := 1 else s[t] := 0;
    OP_GT,      // Greater Than     |   t := t - 1; if s[t] > s[t + 1] then s[t] := 1 else s[t] := 0;
    OP_LT,      // Less Than        |   t := t - 1; if s[t] < s[t + 1] then s[t] := 1 else s[t] := 0;
    OP_GE,      // Greater or Equal |   t := t - 1; if s[t] >= s[t + 1] then s[t] := 1 else s[t] := 0;
    OP_LE,      // Less or Equal    |   t := t - 1; if s[t] <= s[t + 1] then s[t] := 1 else s[t] := 0;
    OP_BP       // Break point
} OpCode;

typedef struct {
    OpCode Op;
    int p;
    int q;
} Instruction;

Instruction Code [MAX_CODE];
int nCode; // top of Code
int Stack[MAX_DATA];

int PC; // Program Counter
int BP;  // Base
int SP;  // Top






int getCh(FILE *file);
TokenType getAToken(void);
TokenType getToken(void);

void factor(void);      // phan tich nhaZZZ tu
void term(void);        // phan tich so hang
void expression(void);  // phan tich bieu thuc
void condition(void);   // phan tich dieu kien
void statement(void);   // phan tich cau lenh
void compileBlock(void);       // phan tich cac khoi cau lenh
void program(void);     // phan tich chuong trinh

int compile(char* filename);
void error(const char msg[]);

// Symtab
int currentSymTab;

void enter(char *id, ObjectType type, int num);
int location(char *id);
int* lvalue(char *id); // return (do lech frame, offset trong frame)
int checkIdent(char *id);
void mkTable(void);
void freeTable(void);
int checkAvailableProcedure(char *procname);


// semantic
char TokenString[TOKENTYPE_COUNT][MAX_TOKENTYPE_LEN] = {
    "NONE", "IDENT", "NUMBER",
    "BEGIN", "CALL", "CONST", "DO", "ELSE", "END", "FOR",
    "IF", "ODD", "PROCEDURE", "PROGRAM", "THEN", "TO", "VAR", "WHILE",
    "PLUS", "MINUS", "TIMES", "SLASH",
    "EQU", "NEQ", "LSS", "LEQ", "GTR", "GEQ",
    "LPARENT", "RPARENT", "LBRACK", "RBRACK",
    "PERIOD", "COMMA", "SEMICOLON", "ASSIGN", "PERCENT"};

char ErrorString[ERROR_COUNT][ERROR_MAX_LENGTH] = {
    "Success", /*NO_ERR*/
    "error: expected program name", /*MISSING_PROGRAM_NAME*/
    "error: expected procedure name", /*MISSING_PROCEDURE_NAME*/
    "error: expected constant name", /*MISSING_CONSTANT_NAME*/
    "error: expected variable name", /*MISSING_VARIABLE_NAME*/
    "error: expected parameter name", /*MISSING_PARAMETER_NAME*/
    "error: expected for index name", /*MISSING_FOR_INDEX_NAME*/

    "error: expected a number", /*MISSING_NUMBER*/

    "error: expected keyword PROGRAM", /*MISSING_KEYWORD_PROGRAM*/
    "error: expected keyword BEGIN", /*MISSING_KEYWORD_BEGIN*/
    "error: expected keyword END", /*MISSING_KEYWORD_END*/
    "error: expected keyword THEN", /*MISSING_KEYWORD_THEN*/
    "error: expected keyword DO", /*MISSING_KEYWORD_DO*/
    "error: expected keyword TO", /*MISSING_KEYWORD_TO*/

    "error: expected ','", /*MISSING_COMMA*/
    "error: expected ';'", /*MISSING_SEMICONLON*/
    "error: expected ',' or ';'", /*MISSING_COMMA_OR_SEMICOLON*/
    "error: expected ';' or ')'", /*MISSING_SEMICOLON_OR_RPARENT*/
    "error: expected '.'", /*MISSING_PERIOD*/
    "error: expected ':='", /*MISSING_ASSIGN,*/
    "error: expected '='", /*MISSING_EQU*/
    "error: expected ')'", /*MISSING_RPARENT*/
    "error: expected ']'", /*MISSING_RBRACK*/
    "error: expected '=', '>', '>=', '<', '<=' or '<>'", /*MISSING_COMPARASION_OPERATOR*/

    "error: invalid factor", /*INVALID_FACTOR*/

    "error: too many names", /*TOO_MANY_NAMES*/
    "error: redeclared", /*REDECLARED_NAME*/
    "error: undeclared variable", /*UNDECLARED_VARIABLE*/
    "error: undeclared array",/*UNDECLARED_ARRAY*/
    "error: invalid array",/*INVALID_ARRAY*/
    "error: left side must be variable",/*INVALID_LEFTSIDE*/
    "error: undeclared procedure", /*UNDECLARED_PROCEDURE*/
    "error: invalid procedure", /*INVALID_PROCEDURE*/

    "error: cannot redefine procedure",    
};


//Codegen

void genLA(int level, int offset);
void genLV(int level, int offset);
void genLC(int constant);
void genLI(void);
void genINT(int dif);
void genDCT(int dif);
void genJ(int addr);
void updateJ(int addr);
void genFJ(int addr);
void updateFJ(int addr);
void genHL(void);
void genST(void);
void genCALL(int level, int addr);
void genEP(void);
void genEF(void);
void genRC(void);
void genRI(void);
void genWRC(void);
void genWRI(void);
void genWLN(void);
void genADD(void);
void genSUB(void);
void genMUL(void);
void genDIV(void);
void genMOD(void);
void genNEG(void);
void genCV(void);
void genODD(void);
void genEQ(void);
void genNE(void);
void genGT(void);
void genLT(void);
void genGE(void);
void genLE(void);
void genVarAddr(void);
void genVarValue(void);
void genParamAddr(void);
void genParamValue(void);
void genAvailableProc(char *procname);
void genAvailableProcNoParam(char *procname);

void printInstruction(Instruction code);
void printCode(void);



int getCh(FILE *file) {
    int temp;
    temp = getc(file);
    printf("%c", temp);
    if (temp == '\n') {
        printf("\n");
        line++;
    }
    return temp;
}
void error(const char msg[]) {
    printf("\nLine %d : %s", line, msg);
    exit(1);
}

void enter(char *id, ObjectType type, int num) {
	int base = SymTab[currentSymTab].base;
	int top = SymTab[currentSymTab].top;
    if (base + top < MAX_OBJECT) {
        if (checkIdent(id) == 0) {
            top++;
            strcpy(Object[base + top].id, id);
            Object[base + top].type = type;
            if (type == OBJ_PROC) {
                num = nCode + 1;
            }
            Object[base + top].num = num;
            if (top == 0) {
                Object[base + top].offset = 4;
            } else {
                Object[base + top].offset = Object[base + top - 1].offset + 2 * Object[base + top - 1].num;
            }
            SymTab[currentSymTab].top = top;
        } else {
            error(ErrorString[REDECLARED_NAME]);
        }
    } else {
        error(ErrorString[TOO_MANY_NAMES]);
    }
}

int location(char *id) {
    int cst = currentSymTab;
    do {
        int base = SymTab[cst].base;
        int top = SymTab[cst].top;
        while (top >= 0) {
            if (strcmp(id, Object[base + top].id) != 0) {
                top--;
            } else {
                return base + top;
            }
        }
        cst--;
    } while (cst >= 0);
    return -1;
}

int* lvalue(char *id) {
    int *lv;
    lv = (int*)malloc(sizeof(int) * 3);
    int cst = currentSymTab;
    do {
        int base = SymTab[cst].base;
        int top = SymTab[cst].top;
        while (top >= 0) {
            if (strcmp(id, Object[base + top].id) != 0) {
                top--;
            } else {
                lv[0] = currentSymTab - cst; // do lech frame
                lv[1] = Object[base + top].offset;  // offset trong frame
                lv[2] = cst; // frame chua
                return lv;
            }
        }
        cst--;
    } while (cst >= 0);
}

int checkIdent(char *id) {
    int base = SymTab[currentSymTab].base;
    int top = SymTab[currentSymTab].top;
    while (top >= 0) {
        if (strcmp(id, Object[base + top].id) != 0) {
            top--;
        } else {
            return 1;
        }
    }
    return 0;
}

void mkTable(void) {
    currentSymTab++;
    if (currentSymTab != 0) {
        SymTab[currentSymTab].base = SymTab[currentSymTab - 1].base + SymTab[currentSymTab - 1].top + 1;
    } else {
        SymTab[currentSymTab].base = 0;
    }
    SymTab[currentSymTab].top = -1;
}

void freeTable(void) {
    currentSymTab--;
}
int checkAvailableProcedure(char *procname) {
    return strcasecmp(procname, "read") == 0 | strcasecmp(procname, "readln") == 0
           | strcasecmp(procname, "write") == 0 | strcasecmp(procname, "writei") == 0 | strcasecmp(procname, "writeln") == 0;
}




void genCode(OpCode Op, int p, int q) {
    nCode++;
    Code[nCode].Op = Op;
    Code[nCode].p = p;
    Code[nCode].q = q;
}
void genLA(int level, int offset) {
    // printf("  ((( %d %d  )))",level, offset);

    genCode(OP_LA, level, offset);
}
void genLV(int level, int offset) {
    genCode(OP_LV, level, offset);
}
void genLC(int constant) {
    genCode(OP_LC, 0, constant);
}
void genLI(void) {
    genCode(OP_LI, 0, 0);
}
void genINT(int dif) {
    genCode(OP_INT, 0, dif);
}
void genDCT(int dif) {
    genCode(OP_DCT, 0, dif);
}
void genJ(int addr) {
    genCode(OP_J, 0, addr);
}
void updateJ(int addr) {
    Code[addr].q = nCode + 1 ;
}
void genFJ(int addr) {
    genCode(OP_FJ, 0, addr);
}
void updateFJ(int addr) {
    Code[addr].q = nCode + 1;
}
void genHL(void) {
    genCode(OP_HL, 0, 0);
}
void genST(void) {
    genCode(OP_ST, 0, 0);
}
void genCALL(int level, int addr) {
    genCode(OP_CALL, level, addr);
}
void genEP(void) {
    genCode(OP_EP, 0, 0);
}
void genEF(void) {
    genCode(OP_EF, 0, 0);
}
void genRC(void) {
    genCode(OP_RC, 0, 0);
}
void genRI(void) {
    genCode(OP_RI, 0, 0);
}
void genWRC(void) {
    genCode(OP_WRC, 0, 0);
}
void genWRI(void) {
    genCode(OP_WRI, 0, 0);
}
void genWLN(void) {
    genCode(OP_WLN, 0, 0);
}
void genADD(void) {
    genCode(OP_ADD, 0, 0);
}
void genSUB(void) {
    genCode(OP_SUB, 0, 0);
}
void genMUL(void) {
    genCode(OP_MUL, 0, 0);
}
void genDIV(void) {
    genCode(OP_DIV, 0, 0);
}
void genMOD(void) {
    genCode(OP_MOD, 0, 0);
}
void genNEG(void) {
    genCode(OP_NEG, 0, 0);
}
void genCV(void) {
    genCode(OP_CV, 0, 0);
}
void genODD(void) {
    genCode(OP_ODD, 0, 0);
}
void genEQ(void) {
    genCode(OP_EQ, 0, 0);
}
void genNE(void) {
    genCode(OP_NE, 0, 0);
}
void genGT(void) {
    genCode(OP_GT, 0, 0);
}
void genLT(void) {
    genCode(OP_LT, 0, 0);
}
void genGE(void) {
    genCode(OP_GE, 0, 0);
}
void genLE(void) {
    genCode(OP_LE, 0, 0);
}

void genAvailableProc(char *procname) {
    if (strcasecmp(procname, "read") == 0) {
        genRI();
    } else if (strcasecmp(procname, "readln") == 0) {
        genRI();
    } else if (strcasecmp(procname, "write") == 0) {
        genWRC();
    } else if (strcasecmp(procname, "writei") == 0) {
        genWRI();
    } else if (strcasecmp(procname, "writeln") == 0) {
        genWRI();
        genWLN();
    }
};

void genAvailableProcNoParam(char *procname) {
    if (strcasecmp(procname, "read") == 0) {

    } else if (strcasecmp(procname, "readln") == 0) {

    } else if (strcasecmp(procname, "write") == 0) {

    } else if (strcasecmp(procname, "writeln") == 0) {
        genWLN();
    }
}

int base(int level) {
    int b = BP;
    while (level > 0) {
        b = Stack[b + 3];   // SL
        level--;
    }
    return b;
}

void printInstruction(Instruction code) {
    switch (code.Op) {
    case OP_LA:
        printf("LA %d,%d", code.p, code.q);
        break;
    case OP_LV:
        printf("LV %d,%d", code.p, code.q);
        break;
    case OP_LC:
        printf("LC %d", code.q);
        break;
    case OP_LI:
        printf("LI");
        break;
    case OP_INT:
        printf("INT %d", code.q);
        break;
    case OP_DCT:
        printf("DCT %d", code.q);
        break;
    case OP_J:
        printf("J %d", code.q);
        break;
    case OP_FJ:
        printf("FJ %d", code.q);
        break;
    case OP_HL:
        printf("HLT");
        break;
    case OP_ST:
        printf("ST");
        break;
    case OP_CALL:
        printf("CALL %d,%d", code.p, code.q);
        break;
    case OP_EP:
        printf("EP");
        break;
    case OP_EF:
        printf("EF");
        break;
    case OP_RC:
        printf("RC");
        break;
    case OP_RI:
        printf("RI");
        break;
    case OP_WRC:
        printf("WRC");
        break;
    case OP_WRI:
        printf("WRI");
        break;
    case OP_WLN:
        printf("WLN");
        break;
    case OP_ADD:
        printf("ADD");
        break;
    case OP_SUB:
        printf("SUB");
        break;
    case OP_MUL:
        printf("MUL");
        break;
    case OP_DIV:
        printf("DIV");
        break;
    case OP_MOD:
        printf("MOD");
        break;
    case OP_NEG:
        printf("NEG");
        break;
    case OP_CV:
        printf("CV");
        break;
    case OP_ODD:
        printf("ODD");
        break;
    case OP_EQ:
        printf("EQ");
        break;
    case OP_NE:
        printf("NE");
        break;
    case OP_GT:
        printf("GT");
        break;
    case OP_LT:
        printf("LT");
        break;
    case OP_GE:
        printf("GE");
        break;
    case OP_LE:
        printf("LE");
        break;
    case OP_BP:
        printf("BP");
        break;
    default:
        break;
    }
}

void printCode(void) {
    // printf("\n\n==> Code Generation <==\n\n");
    int pc;
    for (pc = 1; pc <= nCode; pc++) {
        // printf("\n");
        printf("\n%d.\t", pc);
        printInstruction(Code[pc]);
    }
}
int compareString(char *str, char *kw)
{
    while (*str != '\0' && *kw != '\0')
    {
        if (*str != *kw) break;
        else
        {
            str++;
            kw++;
        }
    }
    return (*str == '\0' && *kw == '\0') ? 1 : 0;
};

TokenType checkKeyword(char *str)
{
    int i;
    for (i = 0; i < KEYWORD_COUNT; i++) if (compareString(str, TokenString[i + KEYWORD_START])) return i + KEYWORD_START;
    return NONE;
}

TokenType getAToken(void)
{
    if (curCh == EOF) return EOF;
    int index;
    while (curCh == ' ' || curCh == '\n' || curCh == '\t') curCh = getCh(input);
    if (isalpha(curCh))
    {
        index = 0;
        do
        {
            curCh = toupper(curCh);
            if (index < MAX_IDENT_LEN) id[index++] = curCh;
            curCh = getCh(input);
        } while (isalnum(curCh));
        id[index] = '\0';
        return (checkKeyword(id) != 0) ? checkKeyword(id) : IDENT;
    }
    else if (isdigit(curCh))
    {
        index = 0;
        do
        {
            if (index < MAX_NUMBER_LEN) id[index++] = curCh;
            curCh = getCh(input);
        } while (isdigit(curCh));
        id[index] = '\0';
        return NUMBER;
    }
    else if (curCh == '(')
    {
        curCh = getCh(input);
        if (curCh == '*')
        {
            curCh = getCh(input);
            int state = 0;
            while (curCh != EOF && state < 2)
            {
                if (curCh == '*') state = 1;
                else if (curCh == ')') state = (state == 1) ? 2 : 0;
                else state = 0;
                curCh = getCh(input);
            }
            return getAToken();
        }
        return LPARENT;
    }
    else if (curCh == '<')
    {
        curCh = getCh(input);
        if (curCh == '=')
        {
            curCh = getCh(input);
            return LEQ;
        }
        else if (curCh == '>')
        {
            curCh = getCh(input);
            return NEQ;
        }
        else return LSS;
    }
    else if (curCh == '>')
    {
        curCh = getCh(input);
        if (curCh == '=')
        {
            curCh = getCh(input);
            return GEQ;
        }
        else return GTR;
    }
    else if (curCh == ':')
    {
        curCh = getCh(input);
        if (curCh == '=')
        {
            curCh = getCh(input);
            return ASSIGN;
        }
        else return NONE;
    }
    else
    {
        TokenType res;
        switch (curCh)
        {
        case '+': res = PLUS; break;
        case '-': res = MINUS; break;
        case '*': res = TIMES; break;
        case '/': res = SLASH; break;
        case '=': res = EQU; break;
        case ')': res = RPARENT; break;
        case '[': res = LBRACK; break;
        case ']': res = RBRACK; break;
        case '.': res = PERIOD; break;
        case ',': res = COMMA; break;
        case ';': res = SEMICOLON;break;
        case '%': res = PERCENT; break;
        default: res = NONE;
        }
        curCh = getCh(input);
        return res;
    }
}
TokenType getToken(){
        TokenType tok = NONE;
        while (tok == NONE) tok = getAToken();
        return tok;
}
void factor(void) {
    if (token == IDENT) {

        char str[MAX_IDENT_LEN + 1];
        strcpy(str, id);
        int pos = location(id);
        if (pos < 0) {
            error(ErrorString[UNDECLARED_VARIABLE]);
        }
        if (Object[pos].type == OBJ_PROC) {
            error(ErrorString[INVALID_PROCEDURE]);
        }
        int *lValue = lvalue(id);
        token = getToken();
        if (token == LBRACK) {
            token = getToken();
            expression();
            if (token == RBRACK) {
                token = getToken();
                if (Object[pos].type != OBJ_ARRAY) {
                    strcpy(id, str);
                    error(ErrorString[UNDECLARED_ARRAY]);
                }
                // printf("llll %d %d %s sssssss",lValue[0], lValue[1], id);
                genLV(lValue[0], lValue[1]);
                genADD();
                genLI();
            } else {
                error(ErrorString[MISSING_RBRACK]);
            }
        }
        else{
            if (Object[pos].type == OBJ_ARRAY) {
                strcpy(id, str);
                error(ErrorString[INVALID_ARRAY]);
            }
            genLV(lValue[0], lValue[1]);
        }
    } else if (token == NUMBER) {
        int num = atoi(id);
        token = getToken();
        genLC(num);
    } else if (token == LPARENT) {
        token = getToken();
        expression();
        if (token == RPARENT) {
            token = getToken();
        } else {
            error(ErrorString[MISSING_RPARENT]);
        }
    } else {
        error(ErrorString[INVALID_FACTOR]);
    }
}

void term(void) {
    factor();
    while (token == TIMES || token == SLASH || token == PERCENT) {
        TokenType Op = token;
        token = getToken();
        factor();
        if (Op == TIMES) {
            genMUL();
        } else if (Op == SLASH) {
            genDIV();
        } else if (Op == PERCENT) {
            genMOD();
        }
    }
}

void expression(void) {
    TokenType Op;
    if (token == PLUS || token == MINUS) {
        Op = token;
        token = getToken();
    }
    term();
    if (Op == MINUS) {
        genNEG();
    }
    while (token == PLUS || token == MINUS) {
        Op = token;
        token = getToken();
        term();
        if (Op == PLUS) {
            genADD();
        } else if (Op == MINUS) {
            genSUB();
        }
    }
}

void condition(void) {
    TokenType Op;
    if (token == ODD) {
        token = getToken();
        expression();
        genODD();
    } else {
        expression();
        if (token == EQU || token == GTR || token == GEQ || token == LSS || token == LEQ || token == NEQ) {
            Op = token;
            token = getToken();
            expression();
            if (Op == EQU) {
                genEQ();
            } else if (Op == GTR) {
                genGT();
            } else if (Op == GEQ) {
                genGE();
            } else if (Op == LSS) {
                genLT();
            } else if (Op == LEQ) {
                genLE();
            } else if (Op == NEQ) {
                genNE();
            }
        } else {
            error(ErrorString[MISSING_COMPARASION_OPERATOR]);
        }
    }
}

void compileBlock(void) {
    genJ(0);
    int jAddr = nCode;
    if (token == CONST) {
        token = getToken();
        if (token == IDENT) {
            
            if (checkIdent(id) == 0) {
                enter(id, OBJ_CONST, 1);
            } else {
                error(ErrorString[REDECLARED_NAME]);
            }
            token = getToken();
            if (token == EQU) {
                token = getToken();

                if (token == NUMBER) {
                    token = getToken();
                } else {
                    error(ErrorString[MISSING_NUMBER]);
                }
            } else {
                error(ErrorString[MISSING_EQU]);
            }
        } else {
            error(ErrorString[MISSING_CONSTANT_NAME]);
        }
        while (token == COMMA || token == IDENT) {
            if (token == COMMA) {
                token = getToken();
                if (token == IDENT) {
                    
                    if (checkIdent(id) == 0) {
                        enter(id, OBJ_CONST, 1);
                    } else {
                        error(ErrorString[REDECLARED_NAME]);
                    }
                    token = getToken();
                    if (token == EQU) {
                        token = getToken();

                        if (token == NUMBER) {
                            token = getToken();
                        } else {
                            error(ErrorString[MISSING_NUMBER]);
                        }
                    } else {
                        error(ErrorString[MISSING_EQU]);
                    }
                } else {
                    error(ErrorString[MISSING_CONSTANT_NAME]);
                }
            } else if (token == IDENT) {
                error(ErrorString[MISSING_COMMA]);
            }
        }
        if (token == SEMICOLON) {
            token = getToken();
        } else {
            error(ErrorString[MISSING_SEMICOLON]);
        }
    }
    if (token == VAR) {
        do {
            token = getToken();
            char str[MAX_IDENT_LEN + 1];
            if (token == IDENT) {
                if (checkIdent(id) == 0) {
                    strcpy(str, id);
                } else {
                    error(ErrorString[REDECLARED_NAME]);
                }
                token = getToken();
                if (token == LBRACK) {
                    token = getToken();
                    if (token == NUMBER) {
                        int num = atoi(id);
                        token = getToken();
                        if (token == RBRACK) {
                            token = getToken();
                            if (num > 0) {
                                enter(str, OBJ_ARRAY, num);
                            } else {
                                enter(str, OBJ_ARRAY, 1);
                            }
                        } else {
                            error(ErrorString[MISSING_RBRACK]);
                        }
                    } else {
                        error(ErrorString[MISSING_NUMBER]);
                    }
                } else {
                    enter(str, OBJ_VAR, 1);
                }
            } else {
                error(ErrorString[MISSING_VARIABLE_NAME]);
            }
        }
        while (token == COMMA
        // || token == IDENT
        ) ;
        if (token == SEMICOLON) {
            token = getToken();
        } else {
            error(ErrorString[MISSING_COMMA_OR_SEMICOLON]);
        }
    }
    if (token == PROCEDURE) {
        while (token == PROCEDURE) {
            token = getToken();
            if (token == IDENT) {
                if (checkAvailableProcedure(id)) {
                    error(ErrorString[DEFINE_AVAILABLE_PROCEDURE]);
                }
                if (checkIdent(id) == 0) {
                    enter(id, OBJ_PROC, nCode);
                } else {
                    error(ErrorString[REDECLARED_NAME]);
                }
                mkTable();
                token = getToken();
                if (token == LPARENT) {
                    token = getToken();
                    do {
                        if (token == VAR) {
                            token = getToken();
                        }
                        if (token == IDENT) {
                            if(checkIdent(id) != 0){
                                error(ErrorString[REDECLARED_NAME]);
                            }
                            token = getToken();
                            if (token == SEMICOLON) {
                                token = getToken();
                                continue;
                            } else if (token == RPARENT) {
                                token = getToken();
                                break;
                            } else {
                                error(ErrorString[MISSING_SEMICOLON_OR_RPARENT]);
                            }
                        } else {
                            error(ErrorString[MISSING_PARAMETER_NAME]);
                        }
                    } while (1);
                } // end if token == LPARENT
                if (token == SEMICOLON) {
                    token = getToken();
                    compileBlock();
                    genEP();
                    if (token == SEMICOLON) {
                        token = getToken();
                    } else {
                        error(ErrorString[MISSING_SEMICOLON]);
                    }
                } else {
                    error(ErrorString[MISSING_SEMICOLON]);
                }
                freeTable();
            } else {
                error(ErrorString[MISSING_PROCEDURE_NAME]);
            }
        }
    }
    updateJ(jAddr);

    if (token == BEGIN) {
        token = getToken();
        statement();
        while(token == SEMICOLON || token == IDENT || token == CALL || token == BEGIN ||
              token == IF || token == WHILE || token == FOR) {
            if (token == SEMICOLON) {
                token = getToken();
            } else {
                error(ErrorString[MISSING_SEMICOLON]);
            }
            statement();
        }
        if (token == END) {
            token = getToken();
        } else {
            error(ErrorString[MISSING_KEYWORD_END]);
        }
    } else {
        error(ErrorString[MISSING_KEYWORD_BEGIN]);
    }
}

void statement(void) {
    if (token == IDENT) {
        char str[MAX_IDENT_LEN + 1];
        strcpy(str, id);
        int pos = location(id);
        if (pos < 0) {
            error(ErrorString[UNDECLARED_VARIABLE]);
        }
        int *lValue = lvalue(id);
        token = getToken();
        if (token == LBRACK) {
            token = getToken();
            expression();
            if (token == RBRACK) {
                token = getToken();
                if (Object[pos].type != OBJ_ARRAY) {
                    strcpy(id, str);
                    error(ErrorString[UNDECLARED_ARRAY]);
                }
                genLA(lValue[0], lValue[1]);
                genADD();
                genLI();

            } else {
                error(ErrorString[MISSING_RBRACK]);
            }
        }
        //  else {
        //     if (Object[pos].type != OBJ_VAR) {
        //         strcpy(id, str);
        //         error(ErrorString[INVALID_LEFTSIDE]);
        //     }
        //     genLA(lValue[0], lValue[1]);
        // }
        if (token == ASSIGN) {
            token = getToken();
            expression();
            genST();
        } else {
            error(ErrorString[MISSING_ASSIGN]);
        }
    } else if (token == CALL) {
        token = getToken();
        if (token == IDENT) {
            char str[MAX_IDENT_LEN + 1];
            strcpy(str, id);
            if (checkAvailableProcedure(id)) {
                token = getToken();
                if (token == LPARENT) {
                    token = getToken();
                    if (token == RPARENT) {
                        token = getToken();
                        genAvailableProcNoParam(str);
                    } else {
                        expression();
                        genAvailableProc(str);
                        while (token == COMMA) {
                            token = getToken();
                            expression();
                            genAvailableProc(str);
                        }
                        if (token == RPARENT) {
                            token = getToken();
                        } else {
                            error(ErrorString[MISSING_RPARENT]);
                        }
                    }
                } else {
                    genAvailableProcNoParam(str);
                }
            } else {
                int pos = location(id);
                if (pos < 0 || Object[pos].type != OBJ_PROC) {
                    error(ErrorString[UNDECLARED_PROCEDURE]);
            }
                int nPara = 0; // number of parameters for procedure
                genINT(4);
                token = getToken();
                // int i = pos;
                // int j = pos;
                // for (i++; Object[i].type == OBJ_PARA_VALUE || Object[i].type == OBJ_PARA_REFER; i++) {
                //     nPara++;
                // }
                // i = nPara;
                if (token == LPARENT) {
                    do {
                        token = getToken();
                        expression();
                        // i--;
                        // j++;
                        // if (Object[j].type == OBJ_PARA_VALUE) {
                        //     expression();
                        // } else if (Object[j].type == OBJ_PARA_REFER) {
                        //     int *lValue = lvalue(id);
                        //     genLA(lValue[0], lValue[1]);
                        //     token = getToken();
                        //     if (token != COMMA && token != RPARENT) {
                        //         error(ERR_INVALID_PARAM_REFER);
                        //     }
                        // }
                    } while (token == COMMA);
                    // if (i > 0) {
                    //     strcpy(id, str);
                    //     error(ERR_TOO_FEW_PARAMETERS);
                    // } else if (i < 0) {
                    //     strcpy(id, str);
                    //     error(ERR_TOO_MANY_PARAMETERS);
                    // }
                    if (token == RPARENT) {
                        token = getToken();
                    } else {
                        error(ErrorString[MISSING_RPARENT]);
                    }
                }
                genDCT(4 + nPara);
                int* lValue = lvalue(str);
                genCALL(lValue[0], Object[pos].num);
            }
        } else {
            error(ErrorString[MISSING_PROCEDURE_NAME]);
        }
    } else if (token == BEGIN) {
        token = getToken();
        statement();
        while (token == SEMICOLON || token == IDENT || token == CALL || token == BEGIN ||
                token == IF || token == WHILE || token == FOR) {
            if (token == SEMICOLON) {
                token = getToken();
            } else {
                error(ErrorString[MISSING_SEMICOLON]);
            }
            statement();
        }
        if (token == END) {
            token = getToken();
        } else {
            error(ErrorString[MISSING_KEYWORD_END]);
        }
    } else if (token == IF) {
 
        token = getToken();
        condition();
        if (token == THEN) {
            token = getToken();
            int fjAddr;
            int jAddr;
            genFJ(0);
            fjAddr = nCode;
            statement();
            if (token == ELSE) {
                genJ(0);
                jAddr = nCode;
                updateFJ(fjAddr);
                token = getToken();
                statement();
                updateJ(jAddr);
            } else {
                updateFJ(fjAddr);
            }
        } else {
            error(ErrorString[MISSING_KEYWORD_THEN]);
        }

    } else if (token == WHILE) {

        token = getToken();
        int beginWhile = nCode + 1;
        int fjAddr;
        condition();
        genFJ(0);
        fjAddr = nCode;
        if (token == DO) {
            token = getToken();
            statement();
            genJ(beginWhile);
            updateFJ(fjAddr);
        } else {
            error(ErrorString[MISSING_KEYWORD_DO]);
        }

    } else if (token == FOR) {
        token = getToken();
        if (token == IDENT) {

            int pos = location(id);
            if (pos < 0) {
                error(ErrorString[UNDECLARED_VARIABLE]);
            }
            if (Object[pos].type != OBJ_VAR ) {
                error(ErrorString[INVALID_LEFTSIDE]);
            }
            int *lValue = lvalue(id);
            token = getToken();
            genLA(lValue[0], lValue[1]);
        } else {
            error(ErrorString[MISSING_FOR_INDEX_NAME]);
        }

        if (token == ASSIGN) {
            token = getToken();
            genCV();
            expression();
            genST();
            genCV();
            genLI();
            int beginFor = nCode + 1;
            if (token == TO) {
                token = getToken();
                expression();
                genLE();
                genFJ(0);
                int fjAddr = nCode;
                if (token == DO) {
                    token = getToken();
                    statement();
                    genCV();
                    genCV();
                    genLI();
                    genLC(1);
                    genADD();
                    genST();
                    // genCV();
                    // genLI();
                    genJ(beginFor);
                    updateFJ(fjAddr);
                    genDCT(1);
                } else {
                    error(ErrorString[MISSING_KEYWORD_DO]);
                }
            } else {
                error(ErrorString[MISSING_KEYWORD_TO]);
            }

        } else {
            error(ErrorString[MISSING_ASSIGN]);
        }
    }
}

void program(void) {
    if (token == PROGRAM) {
        token = getToken();
        if (token == IDENT) {
            currentSymTab = -1;
            mkTable();
            token = getToken();
            if (token == SEMICOLON) {
                token = getToken();
                compileBlock();
                if (token == PERIOD) {
                    genHL();
                    printCode();
                    freeTable();
                    error(ErrorString[NO_ERR]); 
                } else {
                    error(ErrorString[MISSING_PERIOD]);
                }
            } else {
                error(ErrorString[MISSING_SEMICOLON]);
            }
        } else {
            error(ErrorString[MISSING_PROGRAM_NAME]);
        }
    } else {
        error(ErrorString[MISSING_KEYWORD_PROGRAM]);
    }
}
int compile(char* filename) {
    if ((input = fopen(filename, "rt")) != NULL) {
        line = 1;
        curCh = ' ';
        token = getToken();
        program();
        return 1;
    } else {
        return 0;
    }
}
int main(int argc, char* argv[]) {
    if (compile(argv[1]) == 0) {
        printf("\n\nError: Cannot read file \"%s\"\n\n", argv[1]);
        return -1;
    }
    return 0;
}
