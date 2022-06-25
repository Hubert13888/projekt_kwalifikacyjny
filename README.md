Opis zadania

Głównym celem Twojego zadania jest zakodowanie skryptu który po kliknięciu w przycisk wyświetli na lokalnym serwerze wykres oraz tabelę z danymi pobranymi z API.

W ramach zadania należy stworzyć następującą strukturę.
1. Blok tekstu z minimum dwoma akapitami.
2. Placeholder zabezpieczający przed skakaniem treści strony, a w nim
    - Wykres
        - powinien być zasilany danymi z API https://randomuser.me/ (należy pobrać 1000 rekordów zawierających informacje o mężczyznach narodowości francuskiej)
        - przedstawiać ilość mężczyzn, których wiek mieści się w kolejnych przedziałach (20-29,30-39… itd.)
    - Tabela z danymi
        - zawierająca podstawowe informacje o 10-ciu najstarszych mężczyznach
    - Loader
        - wyświetlany zamiast powyższych w momencie ładowania danych
3. Button, który po kliknięciu
    - wyświetli dane w formie wykresu
    - wyświetli tabelę z danymi
4. Blok tekstu z minimum trzema akapitami z tłem
    - tło powinno być wyświetlane tylko co 5-te odświeżenie strony

Wymogi:
- kod w pełni napisany w JS/TS (bez użycia frameworków)
- wykres zrobiony przy pomocy biblioteki chart.js
- strona jest responsywna
- kod jest czytelny
- rozwiązanie udostępnione w formie repozytorium