"use client";

import { useCallback, useState } from "react";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { GlobeIcon } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent } from "@/components/ui/popover";

interface EventTimezoneProps {
  value: string;
  onChange: (value: string) => void;
}

export const EventTimezone = ({ value, onChange }: EventTimezoneProps) => {
  const [open, setOpen] = useState(false);

  const onSelect = useCallback(
    (value: string) => {
      const _value = value.split("~");
      onChange(_value[1] ?? "GMT+01:00");
      setOpen(false);
    },
    [onChange],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex w-24 flex-col justify-between gap-1.5 rounded-md bg-muted px-3 py-1.5 data-[state=open]:bg-muted-foreground/30"
        >
          <GlobeIcon className="size-5 text-muted-foreground md:size-6" />
          <span className="flex flex-col items-start">
            <span className="text-xs md:text-sm">{value}</span>
            <span className="text-xs text-muted-foreground md:text-sm">
              {timezones.find((timezone) => timezone.value === value)?.city ??
                "Unknown"}
            </span>
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent className="mr-3 w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search timezone..." className="h-9" />
          <CommandList>
            <CommandEmpty>No timezone found.</CommandEmpty>

            <CommandGroup>
              {timezones.map((timezone, idx) => (
                <CommandItem
                  key={`${idx}~${timezone.value}`}
                  value={`${idx}~${timezone.value}`}
                  keywords={[timezone.label, timezone.city]}
                  onSelect={onSelect}
                  className="flex items-center justify-between"
                >
                  <p className="truncate">{timezone.label}</p>
                  <p className="w-36 text-right">{timezone.value}</p>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export const timezones = [
  {
    label: "Central European Time - Belgrade",
    value: "GMT+01:00",
    city: "Belgrade",
  },
  {
    label: "Pacific Time - Los Angeles",
    value: "GMT-07:00",
    city: "Los Angeles",
  },
  {
    label: "Central Time - Chicago",
    value: "GMT-05:00",
    city: "Chicago",
  },
  {
    label: "Eastern Time - Toronto",
    value: "GMT-04:00",
    city: "Toronto",
  },
  {
    label: "Eastern Time - New York",
    value: "GMT-04:00",
    city: "New York",
  },
  {
    label: "Brasilia Standard Time - Sao Paulo",
    value: "GMT-03:00",
    city: "Sao Paulo",
  },
  {
    label: "United Kingdom Time - London",
    value: "GMT+00:00",
    city: "London",
  },
  {
    label: "Central European Time - Brussels",
    value: "GMT+01:00",
    city: "Brussels",
  },
  {
    label: "Central European Time - Madrid",
    value: "GMT+01:00",
    city: "Madrid",
  },
  {
    label: "Central European Time - Paris",
    value: "GMT+01:00",
    city: "Paris",
  },
  {
    label: "Gulf Standard Time - Dubai",
    value: "GMT+04:00",
    city: "Dubai",
  },
  {
    label: "India Standard Time - Kolkata",
    value: "GMT+05:30",
    city: "Kolkata",
  },
  {
    label: "Singapore Standard Time - Singapore",
    value: "GMT+08:00",
    city: "Singapore",
  },
  {
    label: "Japan Standard Time - Tokyo",
    value: "GMT+09:00",
    city: "Tokyo",
  },
  {
    label: "Niue Time - Niue",
    value: "GMT-11:00",
    city: "Niue",
  },
  {
    label: "Samoa Standard Time - Pago Pago",
    value: "GMT-11:00",
    city: "Pago Pago",
  },
  {
    label: "Hawaii-Aleutian Standard Time - Honolulu",
    value: "GMT-10:00",
    city: "Honolulu",
  },
  {
    label: "Cook Islands Standard Time - Rarotonga",
    value: "GMT-10:00",
    city: "Rarotonga",
  },
  {
    label: "Tahiti Time - Tahiti",
    value: "GMT-10:00",
    city: "Tahiti",
  },
  {
    label: "Marquesas Time - Marquesas",
    value: "GMT-09:30",
    city: "Marquesas",
  },
  {
    label: "Hawaii-Aleutian Time (Adak) - Adak",
    value: "GMT-09:00",
    city: "Adak",
  },
  {
    label: "Gambier Time - Gambier",
    value: "GMT-09:00",
    city: "Gambier",
  },
  {
    label: "Alaska Time - Anchorage",
    value: "GMT-08:00",
    city: "Anchorage",
  },
  {
    label: "Alaska Time - Juneau",
    value: "GMT-08:00",
    city: "Juneau",
  },
  {
    label: "Alaska Time - Metlakatla",
    value: "GMT-08:00",
    city: "Metlakatla",
  },
  {
    label: "Alaska Time - Nome",
    value: "GMT-08:00",
    city: "Nome",
  },
  {
    label: "Alaska Time - Sitka",
    value: "GMT-08:00",
    city: "Sitka",
  },
  {
    label: "Alaska Time - Yakutat",
    value: "GMT-08:00",
    city: "Yakutat",
  },
  {
    label: "Pitcairn Time - Pitcairn",
    value: "GMT-08:00",
    city: "Pitcairn",
  },
  {
    label: "Yukon Time - Dawson",
    value: "GMT-07:00",
    city: "Dawson",
  },
  {
    label: "Mountain Standard Time - Dawson Creek",
    value: "GMT-07:00",
    city: "Dawson Creek",
  },
  {
    label: "Mountain Standard Time - Fort Nelson",
    value: "GMT-07:00",
    city: "Fort Nelson",
  },
  {
    label: "Mexican Pacific Standard Time - Hermosillo",
    value: "GMT-07:00",
    city: "Hermosillo",
  },
  {
    label: "Pacific Time - Los Angeles",
    value: "GMT-07:00",
    city: "Los Angeles",
  },
  {
    label: "Mexican Pacific Standard Time - Mazatlan",
    value: "GMT-07:00",
    city: "Mazatlan",
  },
  {
    label: "Mountain Standard Time - Phoenix",
    value: "GMT-07:00",
    city: "Phoenix",
  },
  {
    label: "Pacific Time - Tijuana",
    value: "GMT-07:00",
    city: "Tijuana",
  },
  {
    label: "Pacific Time - Vancouver",
    value: "GMT-07:00",
    city: "Vancouver",
  },
  {
    label: "Yukon Time - Whitehorse",
    value: "GMT-07:00",
    city: "Whitehorse",
  },
  {
    label: "Central Standard Time - Bahia Banderas",
    value: "GMT-06:00",
    city: "Bahia Banderas",
  },
  {
    label: "Central Standard Time - Belize",
    value: "GMT-06:00",
    city: "Belize",
  },
  {
    label: "Mountain Time - Boise",
    value: "GMT-06:00",
    city: "Boise",
  },
  {
    label: "Mountain Time - Cambridge Bay",
    value: "GMT-06:00",
    city: "Cambridge Bay",
  },
  {
    label: "Central Standard Time - Chihuahua",
    value: "GMT-06:00",
    city: "Chihuahua",
  },
  {
    label: "Central Standard Time - Costa Rica",
    value: "GMT-06:00",
    city: "Costa Rica",
  },
  {
    label: "Mountain Time - Denver",
    value: "GMT-06:00",
    city: "Denver",
  },
  {
    label: "Mountain Time: Edmonton",
    value: "GMT-06:00",
    city: "Edmonton",
  },
  {
    label: "Central Standard Time: El Salvador",
    value: "GMT-06:00",
    city: "El Salvador",
  },
  {
    label: "Central Standard Time: Guatemala",
    value: "GMT-06:00",
    city: "Guatemala",
  },
  {
    label: "Mountain Time: Inuvik",
    value: "GMT-06:00",
    city: "Inuvik",
  },
  {
    label: "Central Standard Time: Managua",
    value: "GMT-06:00",
    city: "Managua",
  },
  {
    label: "Central Standard Time: Merida",
    value: "GMT-06:00",
    city: "Merida",
  },
  {
    label: "Central Standard Time: Mexico City",
    value: "GMT-06:00",
    city: "Mexico City",
  },
  {
    label: "Central Standard Time: Monterrey",
    value: "GMT-06:00",
    city: "Monterrey",
  },
  {
    label: "Central Standard Time: Regina",
    value: "GMT-06:00",
    city: "Regina",
  },
  {
    label: "Central Standard Time: Swift Current",
    value: "GMT-06:00",
    city: "Swift Current",
  },
  {
    label: "Central Standard Time: Tegucigalpa",
    value: "GMT-06:00",
    city: "Tegucigalpa",
  },
  {
    label: "Mountain Time: Yellowknife",
    value: "GMT-06:00",
    city: "Yellowknife",
  },
  {
    label: "Galapagos Time: Galapagos",
    value: "GMT-06:00",
    city: "Galapagos",
  },
  {
    label: "Colombia Standard Time: Bogota",
    value: "GMT-05:00",
    city: "Bogota",
  },
  {
    label: "Eastern Standard Time - Cancun",
    value: "GMT-05:00",
    city: "Cancun",
  },
  {
    label: "Central Time - Chicago",
    value: "GMT-05:00",
    city: "Chicago",
  },
  {
    label: "Acre Standard Time - Eirunepe",
    value: "GMT-05:00",
    city: "Eirunepe",
  },
  {
    label: "Ecuador Time - Guayaquil",
    value: "GMT-05:00",
    city: "Guayaquil",
  },
  {
    label: "Central Time - Knox, Indiana",
    value: "GMT-05:00",
    city: "Knox, Indiana",
  },
  {
    label: "Central Time - Tell City, Indiana",
    value: "GMT-05:00",
    city: "Tell City, Indiana",
  },
  {
    label: "Eastern Standard Time - Jamaica",
    value: "GMT-05:00",
    city: "Jamaica",
  },
  {
    label: "Peru Standard Time - Lima",
    value: "GMT-05:00",
    city: "Lima",
  },
  {
    label: "Central Time - Matamoros",
    value: "GMT-05:00",
    city: "Matamoros",
  },
  {
    label: "Central Time - Menominee",
    value: "GMT-05:00",
    city: "Menominee",
  },
  {
    label: "Central Time - Beulah, North Dakota",
    value: "GMT-05:00",
    city: "Beulah, North Dakota",
  },
  {
    label: "Central Time - Center, North Dakota",
    value: "GMT-05:00",
    city: "Center, North Dakota",
  },
  {
    label: "Central Time - New Salem, North Dakota",
    value: "GMT-05:00",
    city: "New Salem, North Dakota",
  },
  {
    label: "Central Time - Ojinaga",
    value: "GMT-05:00",
    city: "Ojinaga",
  },
  {
    label: "Eastern Standard Time - Panama",
    value: "GMT-05:00",
    city: "Panama",
  },
  {
    label: "Central Time - Rainy River",
    value: "GMT-05:00",
    city: "Rainy River",
  },
  {
    label: "Central Time - Rankin Inlet",
    value: "GMT-05:00",
    city: "Rankin Inlet",
  },
  {
    label: "Central Time - Resolute",
    value: "GMT-05:00",
    city: "Resolute",
  },
  {
    label: "Acre Standard Time - Rio Branco",
    value: "GMT-05:00",
    city: "Rio Branco",
  },
  {
    label: "Central Time - Winnipeg",
    value: "GMT-05:00",
    city: "Winnipeg",
  },
  {
    label: "Easter Island Time - Easter",
    value: "GMT-05:00",
    city: "Easter",
  },
  {
    label: "Atlantic Standard Time - Barbados",
    value: "GMT-04:00",
    city: "Barbados",
  },
];

// Amazon Standard Time - Boa Vista
// GMT-04:00
// Amazon Standard Time - Campo Grande
// GMT-04:00
// Venezuela Time - Caracas
// GMT-04:00
// Amazon Standard Time - Cuiaba
// GMT-04:00
// Eastern Time - Detroit
// GMT-04:00
// Eastern Time - Grand Turk
// GMT-04:00
// Guyana Time - Guyana
// GMT-04:00
// Cuba Time - Havana
// GMT-04:00
// Eastern Time - Indianapolis, Indiana
// GMT-04:00
// Eastern Time - Marengo, Indiana
// GMT-04:00
// Eastern Time - Petersburg, Indiana
// GMT-04:00
// Eastern Time - Vevay, Indiana
// GMT-04:00
// Eastern Time - Vincennes, Indiana
// GMT-04:00
// Eastern Time - Winamac, Indiana
// GMT-04:00
// Eastern Time - Iqaluit
// GMT-04:00
// Eastern Time - Louisville, Kentucky
// GMT-04:00
// Eastern Time - Monticello, Kentucky
// GMT-04:00
// Bolivia Time - La Paz
// GMT-04:00
// Amazon Standard Time - Manaus
// GMT-04:00
// Atlantic Standard Time - Martinique
// GMT-04:00
// Eastern Time - New York
// GMT-04:00
// Eastern Time - Nipigon
// GMT-04:00
// Eastern Time - Pangnirtung
// GMT-04:00
// Eastern Time - Port-au-Prince
// GMT-04:00
// Amazon Standard Time - Porto Velho
// GMT-04:00
// Atlantic Standard Time - Puerto Rico
// GMT-04:00
// Atlantic Standard Time - Santo Domingo
// GMT-04:00
// Eastern Time - Thunder Bay
// GMT-04:00
// Eastern Time - Toronto
// GMT-04:00
// Brasilia Standard Time - Araguaina
// GMT-03:00
// Argentina Standard Time - Buenos Aires, Argentina
// GMT-03:00
// Argentina Standard Time - Catamarca, Argentina
// GMT-03:00
// Argentina Standard Time - Cordoba, Argentina
// GMT-03:00
// Argentina Standard Time - Jujuy, Argentina
// GMT-03:00
// Argentina Standard Time - La Rioja, Argentina
// GMT-03:00
// Argentina Standard Time - Mendoza, Argentina
// GMT-03:00
// Argentina Standard Time - Rio Gallegos, Argentina
// GMT-03:00
// Argentina Standard Time - Salta, Argentina
// GMT-03:00
// Argentina Standard Time - San Juan, Argentina
// GMT-03:00
// Argentina Standard Time - San Luis, Argentina
// GMT-03:00
// Argentina Standard Time - Tucuman, Argentina
// GMT-03:00
// Argentina Standard Time - Ushuaia, Argentina
// GMT-03:00
// Paraguay Time - Asuncion
// GMT-03:00
// Brasilia Standard Time - Bahia
// GMT-03:00
// Brasilia Standard Time - Belem
// GMT-03:00
// French Guiana Time - Cayenne
// GMT-03:00
// Brasilia Standard Time - Fortaleza
// GMT-03:00
// Atlantic Time - Glace Bay
// GMT-03:00
// Atlantic Time - Goose Bay
// GMT-03:00
// Atlantic Time - Halifax
// GMT-03:00
// Brasilia Standard Time - Maceio
// GMT-03:00
// Atlantic Time - Moncton
// GMT-03:00
// Uruguay Standard Time - Montevideo
// GMT-03:00
// Suriname Time - Paramaribo
// GMT-03:00
// Punta Arenas Time - Punta Arenas
// GMT-03:00
// Brasilia Standard Time - Recife
// GMT-03:00
// Brasilia Standard Time - Santarem
// GMT-03:00
// Chile Time - Santiago
// GMT-03:00
// Brasilia Standard Time - Sao Paulo
// GMT-03:00
// Atlantic Time - Thule
// GMT-03:00
// Palmer Time - Palmer
// GMT-03:00
// Rothera Time - Rothera
// GMT-03:00
// Atlantic Time - Bermuda
// GMT-03:00
// Falkland Islands Standard Time - Stanley
// GMT-03:00
// Newfoundland Time - St Johns
// GMT-02:30
// St Pierre & Miquelon Time - Miquelon
// GMT-02:00
// Fernando de Noronha Standard Time - Noronha
// GMT-02:00
// West Greenland Time - Nuuk
// GMT-02:00
// South Georgia Time - South Georgia
// GMT-02:00
// East Greenland Time - Scoresbysund
// GMT-01:00
// Azores Time - Azores
// GMT-01:00
// Cape Verde Standard Time - Cape Verde
// GMT-01:00
// Greenwich Mean Time - Abidjan
// GMT+00:00
// Greenwich Mean Time - Bissau
// GMT+00:00
// Morocco Time - Casablanca
// GMT+00:00
// Western Sahara Time - El Aaiun
// GMT+00:00
// Greenwich Mean Time - Monrovia
// GMT+00:00
// Greenwich Mean Time - Sao Tome
// GMT+00:00
// Greenwich Mean Time - Danmarkshavn
// GMT+00:00
// Troll Time - Troll
// GMT+00:00
// Western European Time - Canary
// GMT+00:00
// Western European Time - Faroe
// GMT+00:00
// Western European Time - Madeira
// GMT+00:00
// Greenwich Mean Time - Reykjavik
// GMT+00:00
// Ireland Time - Dublin
// GMT+00:00
// Western European Time - Lisbon
// GMT+00:00
// United Kingdom Time - London
// GMT+00:00
// UTC - UTC
// GMT+00:00
// Central European Standard Time - Algiers
// GMT+01:00
// Central European Time - Ceuta
// GMT+01:00
// West Africa Standard Time - Lagos
// GMT+01:00
// West Africa Standard Time - Ndjamena
// GMT+01:00
// Central European Standard Time - Tunis
// GMT+01:00
// Central European Time - Amsterdam
// GMT+01:00
// Central European Time - Andorra
// GMT+01:00
// Central European Time - Belgrade
// GMT+01:00
// Central European Time - Berlin
// GMT+01:00
// Central European Time - Brussels
// GMT+01:00
// Central European Time - Budapest
// GMT+01:00
// Central European Time - Copenhagen
// GMT+01:00
// Central European Time - Gibraltar
// GMT+01:00
// Central European Time - Luxembourg
// GMT+01:00
// Central European Time - Madrid
// GMT+01:00
// Central European Time - Malta
// GMT+01:00
// Central European Time - Monaco
// GMT+01:00
// Central European Time - Oslo
// GMT+01:00
// Central European Time - Paris
// GMT+01:00
// Central European Time - Prague
// GMT+01:00
// Central European Time - Rome
// GMT+01:00
// Central European Time - Stockholm
// GMT+01:00
// Central European Time - Tirane
// GMT+01:00
// Central European Time - Vienna
// GMT+01:00
// Central European Time - Warsaw
// GMT+01:00
// Central European Time - Zurich
// GMT+01:00
// Eastern European Time - Cairo
// GMT+02:00
// South Africa Standard Time - Johannesburg
// GMT+02:00
// Central Africa Time - Juba
// GMT+02:00
// Central Africa Time - Khartoum
// GMT+02:00
// Central Africa Time - Maputo
// GMT+02:00
// Eastern European Standard Time - Tripoli
// GMT+02:00
// Central Africa Time - Windhoek
// GMT+02:00
// Eastern European Time - Beirut
// GMT+02:00
// Famagusta Time - Famagusta
// GMT+02:00
// Eastern European Time - Gaza
// GMT+02:00
// Eastern European Time - Hebron
// GMT+02:00
// Israel Time - Jerusalem
// GMT+02:00
// Eastern European Time - Nicosia
// GMT+02:00
// Eastern European Time - Athens
// GMT+02:00
// Eastern European Time - Bucharest
// GMT+02:00
// Eastern European Time - Chisinau
// GMT+02:00
// Eastern European Time - Helsinki
// GMT+02:00
// Eastern European Standard Time - Kaliningrad
// GMT+02:00
// Eastern European Time - Kiev
// GMT+02:00
// Eastern European Time - Riga
// GMT+02:00
// Eastern European Time - Sofia
// GMT+02:00
// Eastern European Time - Tallinn
// GMT+02:00
// Eastern European Time - Uzhgorod
// GMT+02:00
// Eastern European Time - Vilnius
// GMT+02:00
// Eastern European Time - Zaporozhye
// GMT+02:00
// East Africa Time - Nairobi
// GMT+03:00
// Jordan Time - Amman
// GMT+03:00
// Arabian Standard Time - Baghdad
// GMT+03:00
// Syria Time - Damascus
// GMT+03:00
// Arabian Standard Time - Qatar
// GMT+03:00
// Arabian Standard Time - Riyadh
// GMT+03:00
// Türkiye Time - Istanbul
// GMT+03:00
// Kirov Time - Kirov
// GMT+03:00
// Moscow Standard Time - Minsk
// GMT+03:00
// Moscow Standard Time - Moscow
// GMT+03:00
// Moscow Standard Time - Simferopol
// GMT+03:00
// Volgograd Standard Time - Volgograd
// GMT+03:00
// Iran Standard Time - Tehran
// GMT+03:30
// Azerbaijan Standard Time - Baku
// GMT+04:00
// Gulf Standard Time - Dubai
// GMT+04:00
// Georgia Standard Time - Tbilisi
// GMT+04:00
// Armenia Standard Time - Yerevan
// GMT+04:00
// Astrakhan Time - Astrakhan
// GMT+04:00
// Samara Standard Time - Samara
// GMT+04:00
// Saratov Time - Saratov
// GMT+04:00
// Ulyanovsk Time - Ulyanovsk
// GMT+04:00
// Seychelles Time - Mahe
// GMT+04:00
// Mauritius Standard Time - Mauritius
// GMT+04:00
// Réunion Time - Reunion
// GMT+04:00
// Afghanistan Time - Kabul
// GMT+04:30
// Mawson Time - Mawson
// GMT+05:00
// West Kazakhstan Time - Aqtau
// GMT+05:00
// West Kazakhstan Time - Aqtobe
// GMT+05:00
// Turkmenistan Standard Time - Ashgabat
// GMT+05:00
// West Kazakhstan Time - Atyrau
// GMT+05:00
// Tajikistan Time - Dushanbe
// GMT+05:00
// Pakistan Standard Time - Karachi
// GMT+05:00
// West Kazakhstan Time - Oral
// GMT+05:00
// West Kazakhstan Time - Qyzylorda
// GMT+05:00
// Uzbekistan Standard Time - Samarkand
// GMT+05:00
// Uzbekistan Standard Time - Tashkent
// GMT+05:00
// Yekaterinburg Standard Time - Yekaterinburg
// GMT+05:00
// French Southern & Antarctic Time - Kerguelen
// GMT+05:00
// Maldives Time - Maldives
// GMT+05:00
// India Standard Time - Colombo
// GMT+05:30
// India Standard Time - Kolkata
// GMT+05:30
// Nepal Time - Kathmandu
// GMT+05:45
// Vostok Time - Vostok
// GMT+06:00
// East Kazakhstan Time - Almaty
// GMT+06:00
// Kyrgyzstan Time - Bishkek
// GMT+06:00
// Bangladesh Standard Time - Dhaka
// GMT+06:00
// Omsk Standard Time - Omsk
// GMT+06:00
// East Kazakhstan Time - Qostanay
// GMT+06:00
// Bhutan Time - Thimphu
// GMT+06:00
// Urumqi Time - Urumqi
// GMT+06:00
// Indian Ocean Time - Chagos
// GMT+06:00
// Myanmar Time - Yangon
// GMT+06:30
// Cocos Islands Time - Cocos
// GMT+06:30
// Davis Time - Davis
// GMT+07:00
// Indochina Time - Bangkok
// GMT+07:00
// Barnaul Time - Barnaul
// GMT+07:00
// Indochina Time - Ho Chi Minh
// GMT+07:00
// Hovd Standard Time - Hovd
// GMT+07:00
// Western Indonesia Time - Jakarta
// GMT+07:00
// Krasnoyarsk Standard Time - Krasnoyarsk
// GMT+07:00
// Krasnoyarsk Standard Time - Novokuznetsk
// GMT+07:00
// Novosibirsk Standard Time - Novosibirsk
// GMT+07:00
// Western Indonesia Time - Pontianak
// GMT+07:00
// Tomsk Time - Tomsk
// GMT+07:00
// Christmas Island Time - Christmas
// GMT+07:00
// Brunei Darussalam Time - Brunei
// GMT+08:00
// Ulaanbaatar Standard Time - Choibalsan
// GMT+08:00
// Hong Kong Standard Time - Hong Kong
// GMT+08:00
// Irkutsk Standard Time - Irkutsk
// GMT+08:00
// Malaysia Time - Kuala Lumpur
// GMT+08:00
// Malaysia Time - Kuching
// GMT+08:00
// China Standard Time - Macau
// GMT+08:00
// Central Indonesia Time - Makassar
// GMT+08:00
// Philippine Standard Time - Manila
// GMT+08:00
// China Standard Time - Shanghai
// GMT+08:00
// Singapore Standard Time - Singapore
// GMT+08:00
// Taipei Standard Time - Taipei
// GMT+08:00
// Ulaanbaatar Standard Time - Ulaanbaatar
// GMT+08:00
// Australian Western Standard Time - Perth
// GMT+08:00
// Australian Central Western Standard Time - Eucla
// GMT+08:45
// Yakutsk Standard Time - Chita
// GMT+09:00
// East Timor Time - Dili
// GMT+09:00
// Eastern Indonesia Time - Jayapura
// GMT+09:00
// Yakutsk Standard Time - Khandyga
// GMT+09:00
// Korean Standard Time - Pyongyang
// GMT+09:00
// Korean Standard Time - Seoul
// GMT+09:00
// Japan Standard Time - Tokyo
// GMT+09:00
// Yakutsk Standard Time - Yakutsk
// GMT+09:00
// Palau Time - Palau
// GMT+09:00
// Australian Central Standard Time - Darwin
// GMT+09:30
// Vladivostok Standard Time - Ust-Nera
// GMT+10:00
// Vladivostok Standard Time - Vladivostok
// GMT+10:00
// Australian Eastern Standard Time - Brisbane
// GMT+10:00
// Australian Eastern Standard Time - Lindeman
// GMT+10:00
// Chuuk Time - Chuuk
// GMT+10:00
// Chamorro Standard Time - Guam
// GMT+10:00
// Papua New Guinea Time - Port Moresby
// GMT+10:00
// Central Australia Time - Adelaide
// GMT+10:30
// Central Australia Time - Broken Hill
// GMT+10:30
// Casey Time - Casey
// GMT+11:00
// Eastern Australia Time - Macquarie
// GMT+11:00
// Magadan Standard Time - Magadan
// GMT+11:00
// Sakhalin Standard Time - Sakhalin
// GMT+11:00
// Srednekolymsk Time - Srednekolymsk
// GMT+11:00
// Eastern Australia Time - Hobart
// GMT+11:00
// Lord Howe Time - Lord Howe
// GMT+11:00
// Eastern Australia Time - Melbourne
// GMT+11:00
// Eastern Australia Time - Sydney
// GMT+11:00
// Bougainville Time - Bougainville
// GMT+11:00
// Vanuatu Standard Time - Efate
// GMT+11:00
// Solomon Islands Time - Guadalcanal
// GMT+11:00
// Kosrae Time - Kosrae
// GMT+11:00
// New Caledonia Standard Time - Noumea
// GMT+11:00
// Ponape Time - Pohnpei
// GMT+11:00
// Anadyr Standard Time - Anadyr
// GMT+12:00
// Petropavlovsk-Kamchatski Standard Time - Kamchatka
// GMT+12:00
// Fiji Standard Time - Fiji
// GMT+12:00
// Tuvalu Time - Funafuti
// GMT+12:00
// Marshall Islands Time - Kwajalein
// GMT+12:00
// Marshall Islands Time - Majuro
// GMT+12:00
// Nauru Time - Nauru
// GMT+12:00
// Norfolk Island Time - Norfolk
// GMT+12:00
// Gilbert Islands Time - Tarawa
// GMT+12:00
// Wake Island Time - Wake
// GMT+12:00
// Wallis & Futuna Time - Wallis
// GMT+12:00
// Apia Standard Time - Apia
// GMT+13:00
// New Zealand Time - Auckland
// GMT+13:00
// Tokelau Time - Fakaofo
// GMT+13:00
// Phoenix Islands Time - Enderbury
// GMT+13:00
// Tonga Standard Time - Tongatapu
// GMT+13:00
// Chatham Time - Chatham
// GMT+13:45
// Line Islands Time - Kiritimati
// GMT+14:00
