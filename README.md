word-morpher
============

Corpus de Referencia CREA de la RAE
-----------------------------------

No es un listado de palabras sino un listado de frecuencias, contiene
préstamos linguísticos

### Datos

* [CREA](http://corpus.rae.es/lfrecuencias.html)

### Comando

    wget -O- http://corpus.rae.es/frec/CREA_total.zip | \
    gzip - -c -d | iconv -f iso-8859-1 | \
    sed -E 's/[0-9 .\t]+([^ \t0-9]+).*/\1/g' | \
    grep -E '^.{4,5}$' | tee res/corpus-rae-es.txt

Lemarios olea
-------------

### Datos

* [olea](github.com/olea/lemarios)

### Lemario general del español

    wget -O- \
    http://olea.org/proyectos/lemarios/lemario-espanol-2002-10-25.txt.gz | \
    gzip - -c -d | iconv -f iso-8859-1 | \
    grep -E '^.{4,5}$' | tee res/lemario-general-olea.txt

### Lemario DRAE actualizado

    wget -O- http://www.teoruiz.com/lemario/lemario-20101017.txt.gz | \
    gzip - -c -d | grep -E '^.{4,5}$' | tee res/lemario-drae-actualizado.txt

### Lemario del proyecto Snowball

Vocabulario

    wget -O- http://snowball.tartarus.org/algorithms/spanish/voc.txt | \
    grep -E '^.{4,5}$' | tee res/lemario-snowball-vocabulario.txt

Palabras vacías

    wget -O- http://snowball.tartarus.org/algorithms/spanish/stop.txt | \
    grep -E '^.{4,5}$' | tee res/lemario-snowball-vacias.txt

### Lemario nombres propios

    wget -O- \
    http://olea.org/proyectos/lemarios/nombres-propios-2003-08-28.txt | \
    grep -E '^.{4,5}$' | tee res/lemario-nombres-propios.txt

### Diccionario UNIX

    egrep -i "^[abcdefghijklmnopqrstuvwxyz]{4,5}$" /usr/share/dict/words | \
    tee res/diccionario-unix.txt


    

