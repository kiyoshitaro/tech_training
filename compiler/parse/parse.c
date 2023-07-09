#include <stdio.h>
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

#define ERROR_COUNT 26
#define ERROR_MAX_LENGTH 50

#define MAX_IDENT_LEN 10
#define MAX_NUMBER_LEN 6
#define MAX_TOKENTYPE_LEN 10
#define TOKENTYPE_COUNT 37
#define KEYWORD_COUNT 15
#define KEYWORD_START 3

FILE *input;
int curCh;
int line;

int getCh(FILE *file);

void factor(void);      // phan tich nhau tu
void term(void);        // phan tich so hang
void expression(void);  // phan tich bieu thuc
void condition(void);   // phan tich dieu kien
void statement(void);   // phan tich cau lenh
void block(void);       // phan tich cac khoi cau lenh
void program(void);     // phan tich chuong trinh

int compile(char* filename);
void error(const char msg[]);



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
    MISSING_SEMICONLON,
    MISSING_COMMA_OR_SEMICOLON,
    MISSING_SEMICOLON_OR_RPARENT,
    MISSING_PERIOD,
    MISSING_ASSIGN,
    MISSING_EQU,
    MISSING_RPARENT,
    MISSING_RBRACK,
    MISSING_COMPARASION_OPERATOR,

    INVALID_CONDITION,
    INVALID_FACTOR,
} ErrorType;
TokenType getAToken(void);
TokenType token;
int curCh;
FILE *input;
char id[MAX_IDENT_LEN + 1];


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

    "error: invalid condition", /*INVALID_CONDITION*/
    "error: invalid factor", /*INVALID_FACTOR*/
};



int getCh(FILE *file) {
    int temp;
    temp = getc(file);
    // printf("%c\n", temp);
    if (temp == '\n') {
        line++;
    }
    return temp;
}
void error(const char msg[]) {
    if(token == IDENT) {
        printf("\n\n-- Line %d\t| %s before %s(%s) token\n", line, msg, TokenString[token], id);
    } else if (token == NUMBER) {
        printf("\n\n-- Line %d\t| %s before %s(%d) token\n", line, msg, TokenString[token], atoi(id));
    } else if (token == NONE) {
        printf("\n\n-- Line %d\t| error: stray '%c' in program\n", line, id[0]);
    } else if (token == EOF) {
        printf("\n\n-- Line %d\t| %s\n", line, msg);
    } else {
        printf("\n\n-- Line %d\t| %s before %s token\n", line, msg, TokenString[token]);
    }
    exit(-3);
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
        token = getToken();
        if (token == LBRACK) {
            token = getToken();
            expression();
            if (token == RBRACK) {
                token = getToken();
            } else {
                error(ErrorString[MISSING_RBRACK]);
            }
        }
    } else if (token == NUMBER) {
        token = getToken();
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
        token = getToken();
        factor();
    }
}

void expression(void) {
    if (token == PLUS || token == MINUS) {
        token = getToken();
    }
    term();
    while (token == PLUS || token == MINUS) {
        token = getToken();
        term();
    }
}

void condition(void) {
    if (token == ODD) {
        token = getToken();
        expression();
    } else {
        expression();
        if (token == EQU || token == GTR || token == GEQ || token == LSS || token == LEQ || token == NEQ) {
            token = getToken();
            expression();
        } else {
            error(ErrorString[MISSING_COMPARASION_OPERATOR]);
        }
    }
}

void block(void) {
    if (token == CONST) {
        token = getToken();

        do {
            if (token == IDENT) {
                token = getToken();

                if (token == EQU) {
                    token = getToken();

                    if (token == NUMBER) {
                        token = getToken();

                        if (token == COMMA) {
                            token = getToken();
                            if (token != IDENT) {
                                error(ErrorString[MISSING_CONSTANT_NAME]);
                            }
                        } else if (token == SEMICOLON) {
                            token = getToken();
                            break;
                        } else {
                            error(ErrorString[MISSING_COMMA_OR_SEMICOLON]);
                        }
                    } else {
                        error(ErrorString[MISSING_NUMBER]);
                    }
                } else {
                    error(ErrorString[MISSING_EQU]);
                }
            } else {
                error(ErrorString[MISSING_CONSTANT_NAME]);
            }
        } while (token == IDENT);
    }
    if (token == VAR) {
        token = getToken();
        do {
            if (token == IDENT) {
                token = getToken();
                if (token == LBRACK) {
                    token = getToken();
                    if (token == NUMBER) {
                        token = getToken();
                        if (token == RBRACK) {
                            token = getToken();
                        } else {
                            error(ErrorString[MISSING_RBRACK]);
                        }
                    } else {
                        error(ErrorString[MISSING_NUMBER]);
                    }
                }
                if (token == COMMA) {
                    token = getToken();
                    if (token != IDENT) {
                        error(ErrorString[MISSING_VARIABLE_NAME]);
                    }
                } else if (token == SEMICOLON) {
                    token = getToken();
                    break;
                } else {
                    error(ErrorString[MISSING_COMMA_OR_SEMICOLON]);
                }
            } else {
                error(ErrorString[MISSING_VARIABLE_NAME]);
            }
        } while (token == IDENT);
    }
    if (token == PROCEDURE) {
        while (token == PROCEDURE) {
            token = getToken();
            if (token == IDENT) {
                token = getToken();
                if (token == LPARENT) {
                    token = getToken();
                    do {
                        if (token == VAR) {
                            token = getToken();
                        }
                        if (token == IDENT) {
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
                    block();
                    if (token == SEMICOLON) {
                        token = getToken();
                    } else {
                        error(ErrorString[MISSING_SEMICONLON]);
                    }
                } else {
                    error(ErrorString[MISSING_SEMICONLON]);
                }
            } else {
                error(ErrorString[MISSING_PROCEDURE_NAME]);
            }
        }
    }
    if (token == BEGIN) {
        token = getToken();
        statement();
        while(token == SEMICOLON) {
            token = getToken();
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
        token = getToken();
        if (token == LBRACK) {
            token = getToken();
            expression();
            if (token == RBRACK) {
                token = getToken();
            } else {
                error(ErrorString[MISSING_RBRACK]);
            }
        }
        if (token == ASSIGN) {
            token = getToken();
            expression();
        } else {
            error(ErrorString[MISSING_ASSIGN]);
        }
    } else if (token == CALL) {
        token = getToken();
        if (token == IDENT) {
            token = getToken();
            if (token == LPARENT) {
                do {
                    token = getToken();
                    expression();
                } while (token == COMMA);
                if (token == RPARENT) {
                    token = getToken();
                } else {
                    error(ErrorString[MISSING_RPARENT]);
                }
            }
        } else {
            error(ErrorString[MISSING_PROCEDURE_NAME]);
        }
    } else if (token == BEGIN) {
        token = getToken();
        statement();
        while (token == SEMICOLON) {
            token = getToken();
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
            statement();
            if (token == ELSE) {
                token = getToken();
                statement();
            }
        } else {
            error(ErrorString[MISSING_KEYWORD_THEN]);
        }
    } else if (token == WHILE) {
        token = getToken();
        condition();
        if (token == DO) {
            token = getToken();
            statement();
        } else {
            error(ErrorString[MISSING_KEYWORD_DO]);
        }
    } else if (token == FOR) {
        token = getToken();
        if (token == IDENT) {
            token = getToken();
            if (token == ASSIGN) {
                token = getToken();
                expression();
                if (token == TO) {
                    token = getToken();
                    expression();
                    if (token == DO) {
                        token = getToken();
                        statement();
                    } else {
                        error(ErrorString[MISSING_KEYWORD_DO]);
                    }
                } else {
                    error(ErrorString[MISSING_KEYWORD_TO]);
                }
            } else {
                error(ErrorString[MISSING_ASSIGN]);
            }
        } else {
            error(ErrorString[MISSING_FOR_INDEX_NAME]);
        }
    }
}

void program(void) {
    if (token == PROGRAM) {
        token = getToken();
        if (token == IDENT) {
            token = getToken();
            if (token == SEMICOLON) {
                token = getToken();
                block();
                if (token == PERIOD) {
                    printf("\n Thành công");
                } else {
                    error(ErrorString[MISSING_PERIOD]);
                }
            } else {
                error(ErrorString[MISSING_SEMICONLON]);
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
