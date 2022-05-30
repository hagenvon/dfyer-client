import React, { useEffect } from "react";
import {
  Box,
  Center,
  Grid,
  Pagination,
  SimpleGrid,
  Text,
  MultiSelect,
  Slider,
  SegmentedControl,
  Collapse,
  Group,
  Button,
  Alert,
  Chip,
  Card,
  Drawer,
} from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InfamousData } from "../models/InfamousMap";
import {
  selectAllActiveFilters,
  selectAllFilters,
  selectAllWeights,
  selectShowWeights,
} from "../redux/raritySelectors";
import {
  removeFilter,
  setEdition,
  setFilters,
  setWeight,
  showWeights,
} from "../redux/rarityState";
import { SingleTokenOverview } from "../components/thug/SingleTokenOverview";
import {
  selectCountedAttributes,
  selectFilteredInfamousData,
  selectInfamousDataWithScore,
} from "../redux/selectors";
import { Editions, Weights } from "../models/Rarity.models";
import { Crown, Flame } from "tabler-icons-react";
import { stringifyFilterTrait } from "../helper/filterTraitString";
import { Headline } from "../components/headlines/Headline";

export function CollectionPage() {
  const [activePage, setPage] = useState(1);
  const [filterOpened, setFilterOpened] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const countedAttributes = useSelector(selectCountedAttributes);

  const filters = useSelector(selectAllFilters);
  const filteredItems = useSelector(selectFilteredInfamousData);

  const allActiveFilter = useSelector(selectAllActiveFilters);

  const isDrawerOpen = useSelector(selectShowWeights);

  const traitWeights = useSelector(selectAllWeights);

  const [weights, updateWeights] = useState<Weights>({ ...traitWeights });

  const dispatch = useDispatch();

  const getFinalWeight = (given: number | undefined) => {
    if (given === undefined) {
      return 100;
    }

    return given * 100;
  };

  const sortedItems = filteredItems.sort(compareRarity);

  function compare(a: InfamousData, b: InfamousData) {
    if (a.metadata.name < b.metadata.name) {
      return -1;
    }
    if (a.metadata.name > b.metadata.name) {
      return 1;
    }
    return 0;
  }

  function compareRarity(a: InfamousData, b: InfamousData) {
    if (!a.rarityScore || !b.rarityScore) {
      return 0;
    }

    if (a.rarityScore < b.rarityScore) {
      return 1;
    }
    if (a.rarityScore > b.rarityScore) {
      return -1;
    }
    return 0;
  }

  const items = sortedItems.slice(
    (activePage - 1) * itemsPerPage,
    (activePage - 1) * itemsPerPage + itemsPerPage
  );

  const handleChange = (traitType: string) => (values: string[]) => {
    // if (filter.includes(val)) {
    //   setFilter(filter.filter((it) => it !== val));
    // } else {
    //   setFilter([...filter, val]);
    // }

    dispatch(setFilters({ ...filters, [traitType]: values }));
  };

  const handleRemoveFilter = (filterString: string) => {
    dispatch(removeFilter(filterString));
  };

  const handleClearAllFilters = () => {
    dispatch(setFilters({}));
  };

  const filterItems = Object.entries(countedAttributes).map(
    ([trait_type, valueCounter]) => {
      const options = Object.keys(valueCounter).map((value) => {
        return {
          label: value,
          value: `${trait_type}||${value}`,
        };
      });

      return (
        <Box mb={0} key={trait_type}>
          <MultiSelect
            key={trait_type}
            data={options}
            label={trait_type}
            placeholder="Please select"
            onChange={handleChange(trait_type)}
            value={filters[trait_type] || []}
            mb={0}
          />
        </Box>
      );
    }
  );

  return (
    <>
      <Drawer
        opened={isDrawerOpen}
        onClose={() => dispatch(showWeights(false))}
        title="Weights"
        padding="xl"
        size="xl"
        position={"right"}
      >
        {/* Drawer content */}
        <SimpleGrid cols={2}>
          {Object.keys(countedAttributes).map((trait_type) => {
            return (
              <Box key={trait_type} mb={15}>
                <Text size={"xs"} mb={10}>
                  {trait_type}:
                </Text>
                <Slider
                  size={3}
                  value={getFinalWeight(weights[trait_type])}
                  onChange={(value) => {
                    updateWeights((prevWeights) => ({
                      ...prevWeights,
                      [trait_type]: value / 100,
                    }));
                  }}
                  marks={
                    [
                      // { value: 0, label: "0%" },
                      // { value: 25, label: "25%" },
                      // { value: 50, label: "50%" },
                      // { value: 75, label: "75%" },
                      // { value: 100, label: "100%" },
                    ]
                  }
                />
              </Box>
            );
          })}
        </SimpleGrid>
        <Group mt={20}>
          <Button onClick={() => dispatch(setWeight(weights))}>
            Apply Weights
          </Button>
          <Button color={"gray"}>Cancel</Button>
        </Group>
      </Drawer>

      <Grid>
        <Grid.Col>
          <Headline title={"collection"} />
        </Grid.Col>
      </Grid>

      <Group position={"apart"} mb={15}>
        <Group spacing={15}>
          <SegmentedControl
            data={[
              {
                label: (
                  <Center>
                    <Crown size={16} />
                    <Box ml={10}>Classic Thugs</Box>
                  </Center>
                ),
                value: "infamous",
              },
              {
                label: (
                  <Center>
                    <Flame size={16} />
                    <Box ml={10}>Burnt Thugs</Box>
                  </Center>
                ),
                value: "burnt",
              },
            ]}
            onChange={(val) => dispatch(setEdition(val as Editions))}
          />
        </Group>
        <Group>
          <Alert py={5} px={15} color={"gray"}>
            <Text size={"sm"}>Showing: {filteredItems.length} Thugs</Text>
          </Alert>
          <Button
            size="xs"
            onClick={() => dispatch(showWeights(true))}
            variant={"outline"}
          >
            Show Weights
          </Button>
          <Button
            size="xs"
            onClick={() => setFilterOpened(!filterOpened)}
            variant={"outline"}
          >
            {filterOpened ? "Hide Filter" : "Show Filter"}
          </Button>
        </Group>
      </Group>

      {allActiveFilter.length > 0 && (
        <Card mb={16}>
          <Group position={"apart"} mb={16}>
            <Text size={"sm"}>Active Filter:</Text>{" "}
            <Button
              size={"xs"}
              variant={"outline"}
              onClick={handleClearAllFilters}
            >
              Clear All
            </Button>
          </Group>

          <Group>
            {allActiveFilter.map((trait) => {
              const filterString = stringifyFilterTrait(trait);
              return (
                <Chip
                  key={filterString}
                  value={filterString}
                  checked={true}
                  onClick={() => handleRemoveFilter(filterString)}
                >
                  {trait.trait_type}: {trait.value}
                </Chip>
              );
            })}
          </Group>
        </Card>
      )}

      <Collapse in={filterOpened}>
        <SimpleGrid
          cols={3}
          mb={25}
          spacing={"sm"}
          breakpoints={[
            { maxWidth: "sm", cols: 3, spacing: "sm" },
            { maxWidth: "xs", cols: 2, spacing: "xs" },
          ]}
        >
          {filterItems}
        </SimpleGrid>
      </Collapse>

      <SimpleGrid
        cols={5}
        spacing={"sm"}
        breakpoints={[
          { maxWidth: "md", cols: 5, spacing: "sm" },
          { maxWidth: "sm", cols: 3, spacing: "sm" },
          { maxWidth: "xs", cols: 2, spacing: "xs" },
        ]}
      >
        {items.map((data) => {
          return <SingleTokenOverview key={data.token} data={data} />;
        })}
      </SimpleGrid>

      <Center my={30}>
        {filteredItems.length > 0 ? (
          <Pagination
            page={activePage}
            onChange={setPage}
            total={Math.floor(filteredItems.length / itemsPerPage) + 1}
          />
        ) : (
          <Text>Sorry bro, no thugs found!</Text>
        )}
      </Center>
    </>
  );
}
