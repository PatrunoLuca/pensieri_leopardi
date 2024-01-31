class rint:
    # This class defines a Roman numeral integer (rint) object.

    conv_map = {1: "I", 5: "V", 10: "X", 50: "L", 100: "C", 500: "D", 1000: "M"}
    # This dictionary maps Arabic numerals (1, 5, 10, etc.) to their corresponding Roman numeral symbols.

    def __init__(self, number: int) -> None:
        # This constructor initializes a new rint object with the given Arabic numeral value.
        # It sets the _number attribute to the input value and calculates the Roman numeral representation using the _int_to_roman method.

        assert (number) <= 3999

        self._number = int(number)
        self.value = self._int_to_roman(self._number)

    def _int_to_roman(self, intnum: int):
        # This private method converts an Arabic numeral value to its corresponding Roman numeral representation.
        # It iterates over the digits of the number from right to left, calling the _cipher_to_roman method for each digit.

        return "".join(
            [
                self._cipher_to_roman(int(x + "0" * i))
                for i, x in enumerate(reversed(list(str(intnum))))
                if int(x) != 0
            ][::-1]
        )

    def _cipher_to_roman(self, cipher: int):
        # This private method converts a single Arabic numeral cipher to its corresponding Roman numeral symbol.
        # It first finds the closest cipher value in the conversion map.
        # If the cipher is 8, it uses the second closest cipher value to prevent using four of the same symbol.
        # Otherwise, it uses the closest cipher value.
        # It then checks whether the cipher is represented by a single symbol (same as the closest cipher value) or by an operation of two or more symbols.
        # If it's an operation, it concatenates the Roman numeral symbols for the multiple cipher values.
        # Otherwise, it simply returns the single symbol.

        closest_cipher = sorted(
            [(x, abs(x - cipher)) for x in self.conv_map.keys()], key=lambda x: x[-1]
        )

        if "8" == str(cipher)[0]:
            closest_cipher = closest_cipher[1][0]
        else:
            closest_cipher = closest_cipher[0][0]

        if closest_cipher > cipher:
            return f"{self._cipher_to_roman(closest_cipher-cipher)}{self.conv_map[closest_cipher]}"
        elif closest_cipher < cipher:
            return f"{self.conv_map[closest_cipher]}{self._cipher_to_roman(cipher-closest_cipher)}"
        else:
            return self.conv_map[closest_cipher]

    def __str__(self) -> str:
        # This method returns a string representation of the rint object, which is the Roman numeral representation of the original Arabic numeral value.

        return str(self.value)
